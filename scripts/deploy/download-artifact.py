#!/usr/bin/env python3
"""Download a signed artifact URL from stdin using verified parallel ranges."""

import concurrent.futures
import hashlib
import math
import os
from pathlib import Path
import sys
import tempfile
import time
import urllib.request


def download(url, size, digest, output, workers=32):
    output = Path(output)
    block_size = math.ceil(size / workers)
    deadline = time.monotonic() + 420
    with tempfile.TemporaryDirectory(prefix="artifact-parts-", dir=str(output.parent)) as directory:
        parts = []
        for start in range(0, size, block_size):
            end = min(start + block_size, size) - 1
            parts.append((start, end, Path(directory) / str(start)))

        def fetch(part):
            start, end, path = part
            request = urllib.request.Request(url, headers={"Range": "bytes={}-{}".format(start, end)})
            with urllib.request.urlopen(request, timeout=60) as response, path.open("wb") as target:
                expected = "bytes {}-{}/{}".format(start, end, size)
                if response.status != 206 or response.headers.get("Content-Range") != expected:
                    raise RuntimeError("Server did not honor the requested byte range")
                received = 0
                while True:
                    if time.monotonic() > deadline:
                        raise TimeoutError("Artifact download exceeded seven minutes")
                    chunk = response.read(65536)
                    if not chunk:
                        break
                    received += len(chunk)
                    if received > end - start + 1:
                        raise RuntimeError("Received more bytes than requested")
                    target.write(chunk)
                if received != end - start + 1:
                    raise RuntimeError("Incomplete artifact range")
            return path

        with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as executor:
            futures = [executor.submit(fetch, part) for part in parts]
            for count, future in enumerate(concurrent.futures.as_completed(futures), 1):
                future.result()
                print("Downloaded part {}/{}".format(count, len(parts)), flush=True)

        combined = Path(directory) / "complete.zip"
        checksum = hashlib.sha256()
        with combined.open("wb") as target:
            for _, _, path in parts:
                with path.open("rb") as source:
                    while True:
                        chunk = source.read(1024 * 1024)
                        if not chunk:
                            break
                        checksum.update(chunk)
                        target.write(chunk)
        if checksum.hexdigest() != digest:
            raise RuntimeError("Artifact SHA-256 mismatch")
        os.replace(str(combined), str(output))
    print("Artifact SHA-256 verified", flush=True)


if __name__ == "__main__":
    try:
        download(sys.stdin.readline().strip(), int(sys.argv[1]), sys.argv[2], sys.argv[3])
    except Exception as error:
        # Signed URLs must not appear in error output.
        print("Artifact download failed: {}".format(type(error).__name__), file=sys.stderr)
        sys.exit(1)

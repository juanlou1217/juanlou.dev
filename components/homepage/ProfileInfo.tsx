import siteMetadata from '@/data/siteMetadata';
import Twemoji from '@/components/ui/Twemoji';

import { Briefcase, MapPin, Mail, Linkedin, Github, Facebook } from 'lucide-react';

const ProfileCardInfo = () => {
  return (
    <div className="p-3">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white">赵康（卷娄）</h3>
      <h5 className="text-gray-700 dark:text-gray-400">学习ing | 成长ing ｜ INFP</h5>
      <div className="mt-2 mb-2 space-y-3">
        <div className="flex items-center">
          <Briefcase size={20} strokeWidth={1} />
          <p className="px-2">软件工程师 - 实习</p>
        </div>
        <div className="flex items-center">
          <MapPin name="map-pin" size={20} strokeWidth={1} />
          <p className="px-2">中国 🇨🇳 - 杭州 🏙️</p>
        </div>
        <div className="flex items-center">
          <Mail size={20} strokeWidth={1} />
          <p className="px-2">
            <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <a
            target="_blank"
            href={siteMetadata.github}
            rel="noreferrer"
            className="flex items-center text-sm hover:underline"
            data-umami-event="profile-card-github"
          >
            <Github size={20} strokeWidth={1} />
            <span className="ml-px text-gray-500">/</span>
            <span className="ml-0.5">{siteMetadata.socialAccounts.github}</span>
          </a>
          {siteMetadata.socialAccounts.linkedin && (
            <>
              <span className="text-gray-400 dark:text-gray-500">|</span>
              <a
                target="_blank"
                href={`https://linkedin.com/in/${siteMetadata.socialAccounts.linkedin}`}
                rel="noreferrer"
                className="flex items-center text-sm hover:underline"
                data-umami-event="profile-card-linkedin"
              >
                <Linkedin size={20} strokeWidth={1} />
                <span className="ml-px text-gray-500">/</span>
                <span className="ml-0.5">{siteMetadata.socialAccounts.linkedin}</span>
              </a>
            </>
          )}
          {siteMetadata.socialAccounts.facebook && (
            <>
              <span className="text-gray-400 dark:text-gray-500">|</span>
              <a
                target="_blank"
                href={`https://facebook.com/${siteMetadata.socialAccounts.facebook}`}
                rel="noreferrer"
                className="flex items-center text-sm hover:underline"
                data-umami-event="profile-card-facebook"
              >
                <Facebook size={20} strokeWidth={1} />
                <span className="ml-px text-gray-500">/</span>
                <span className="ml-0.5">{siteMetadata.socialAccounts.facebook}</span>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCardInfo;

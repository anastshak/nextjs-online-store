'use client';
import Image from 'next/image';

import Title from '@/components/common/Title';
import InfoItem from '@/components/common/ProfileInfoItem';

import { useAuthStore } from '@/lib/stores/auth.store';

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <p className="text-muted-foreground">Loading profile...</p>;
  }

  const { image, firstName, lastName, email, username, id, gender } = user;

  return (
    <div className="flex items-center justify-center flex-col mt-[10%]">
      <div className="flex items-center justify-center">
        <div className="h-24 w-24 rounded-full overflow-hidden bg-muted flex items-center justify-center">
          {image ? (
            <Image
              src={image}
              alt={`${firstName} ${lastName}`}
              width={96}
              height={96}
              className="object-cover"
            />
          ) : (
            <span className="text-xl font-semibold">
              {firstName?.[0]}
              {lastName?.[0]}
            </span>
          )}
        </div>

        <div className="ml-6">
          <Title text={`${firstName} ${lastName}`} />
          <p className="text-sm text-muted-foreground -mt-6">{email}</p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <InfoItem label="Username" value={`@${username}`} />
        <InfoItem label="User ID" value={id} />
        <InfoItem label="Gender" value={gender} />
      </div>
    </div>
  );
}

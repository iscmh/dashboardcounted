import React from 'react';
import { TikTokAccount } from '../types';
import { Users, Eye, MessageCircle, Heart } from 'lucide-react';

interface AccountCardProps {
  account: TikTokAccount;
}

export function AccountCard({ account }: AccountCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        <img
          src={account.avatar}
          alt={account.username}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-lg">@{account.username}</h3>
          <p className="text-sm text-gray-500">Growth: {account.growth}%</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-600" />
          <span className="text-sm">{account.followers.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-indigo-600" />
          <span className="text-sm">{account.views.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-indigo-600" />
          <span className="text-sm">{account.comments.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-indigo-600" />
          <span className="text-sm">{account.likes.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import appsData from './data/apps.json';

// 1. 데이터 구조 및 타입 정의
interface AppRelease {
  id: string;
  name: string;
  date: string;
  downloadUrl: string;
  platform: 'android' | 'ios';
  changelog: string[];
}

const RELEASES: AppRelease[] = appsData as AppRelease[];

// 아이콘 컴포넌트
const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.98 1.08-3.11-1.06.05-2.31.71-3.06 1.58-.69.8-1.27 2.09-1.09 3.23 1.19.09 2.38-.84 3.07-1.7" />
  </svg>
);

const AndroidIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4213 13.8533 8.0004 12 8.0004c-1.8533 0-3.5902.4209-5.1367.9497L4.8409 5.4471a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589.3432 18.7416h23.3136c0-4.0827-2.3457-7.5549-5.7753-9.4202" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default function App() {
  // 펼침 상태 관리 (Set을 사용하여 다중 선택 가능)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    const newSet = new Set(expandedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedIds(newSet);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans antialiased px-4 flex flex-col items-center">
      <div className="w-full max-w-md flex-1 flex flex-col">
        {/* 헤더 */}
        <header className="px-5 py-5 border-b border-gray-100 flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-orange-50 text-orange-600 shrink-0">
            <span className="text-sm font-bold lowercase">pz</span>
          </div>
          <h1 className="text-base font-bold tracking-tight text-gray-800 whitespace-nowrap">
            App Downloads
          </h1>
        </header>

        {/* 바디 */}
        <main className="flex-1">
          <ul className="divide-y divide-gray-50">
            {RELEASES.map((release) => {
              const isExpanded = expandedIds.has(release.id);
              return (
                <li key={release.id} className="group transition-colors duration-200 hover:bg-gray-50/30">
                  {/* 메인 행: 정보 및 액션 */}
                  <div 
                    className="flex items-center justify-between p-5 cursor-pointer select-none"
                    onClick={() => toggleExpand(release.id)}
                  >
                    <div className="flex flex-col flex-1 min-w-0 gap-1">
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center justify-center w-5 h-5 rounded shrink-0 ${release.platform === 'ios' ? 'bg-gray-100 text-gray-800' : 'bg-green-50 text-green-700'}`}>
                          {release.platform === 'ios' ? <AppleIcon /> : <AndroidIcon />}
                        </div>
                        <span className="font-semibold text-gray-800 truncate text-sm">{release.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{release.date}</span>
                    </div>

                    <div className="flex items-center gap-3 ml-3">
                      <a
                        href={release.downloadUrl}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
                      >
                        <DownloadIcon />
                        <span>Download</span>
                      </a>
                      
                      <button 
                        className={`p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        aria-label="Toggle details"
                      >
                        <ChevronDownIcon />
                      </button>
                    </div>
                  </div>

                  {/* 아코디언: 변경 사항 (Grid 트랜지션 기법 사용) */}
                  <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 pl-[4.5rem]">
                        <div className="bg-gray-50 rounded-md p-4 border border-gray-100">
                          <h4 className="text-xs font-semibold text-gray-800 mb-2">What's New</h4>
                          <ul className="space-y-1.5">
                            {release.changelog.map((log, index) => (
                              <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                                <span className="block w-1 h-1 mt-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                                <span className="leading-relaxed">{log}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </main>

        {/* 푸터 */}
        <footer className="p-4 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400">
            Internal Distribution
          </p>
        </footer>
      </div>
    </div>
  );
}

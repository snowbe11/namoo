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
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased px-4 flex flex-col items-center">
      <div className="w-full max-w-md flex-1 flex flex-col">
        {/* 헤더 */}
        <header className="px-5 py-5 border-b border-gray-100 flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 shrink-0">
            <span className="text-sm font-bold lowercase">pz</span>
          </div>
          <h1 className="text-lg font-bold tracking-tight text-gray-900 whitespace-nowrap">
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
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* 플랫폼 배지 */}
                      <div className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${release.platform === 'ios' ? 'bg-gray-100 text-gray-900' : 'bg-green-50 text-green-700'}`}>
                        <span className="text-[10px] font-bold uppercase tracking-wider">{release.platform === 'ios' ? 'iOS' : 'AOS'}</span>
                      </div>
                      
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-gray-900 truncate text-sm">{release.name}</span>
                        <span className="text-xs text-gray-500 mt-0.5">{release.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 ml-3">
                      <a
                        href={release.downloadUrl}
                        onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 !text-white text-xs font-bold hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-sm hover:shadow"
                      >
                        <DownloadIcon />
                        <span>Download</span>
                      </a>
                      
                      <button 
                        className={`p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-300 ${isExpanded ? 'rotate-180' : ''}`}
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
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                          <h4 className="text-xs font-semibold text-gray-900 mb-2">What's New</h4>
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

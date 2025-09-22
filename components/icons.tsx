// Fix: Provide implementations for all icon components.
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const PlusIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export const XCircleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const XMarkIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const ManIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" {...props}>
        <path fill="#f5e0a0" d="M32 30a13 13 0 1 0 0-26 13 13 0 0 0 0 26z"/>
        <path fill="#454545" d="M37.5 4a11 11 0 0 0-11 0 1 1 0 0 0 .33 2A9 9 0 0 1 37.17 6a1 1 0 0 0 .33-2z"/>
        <path fill="#fff" d="M26 16.29a1 1 0 0 0-1.12 1.63 7 7 0 0 0 14.24 0A1 1 0 0 0 38 16.29a5 5 0 0 1-12 0z"/>
        <path fill="#75b2ff" d="M49 60H15a1 1 0 0 1-1-1V43c0-8.27 6.73-15 15-15h4c8.27 0 15 6.73 15 15v16a1 1 0 0 1-1 1z"/>
        <path fill="#fff" d="M48 59H16a1 1 0 0 1-1-1V43c0-7.72 6.28-14 14-14h4c7.72 0 14 6.28 14 14v15a1 1 0 0 1-1 1z"/>
        <path fill="#ff7800" d="M36 41H28a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2z"/>
        <path fill="#ff7800" d="M32 46a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2z"/>
    </svg>
);

export const WomanIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" {...props}>
    <path fill="#f5e0a0" d="M32 30a13 13 0 1 0 0-26 13 13 0 0 0 0 26z"/>
    <path fill="#454545" d="M44.33 18.06a1 1 0 0 0-1.2.7A11 11 0 0 1 20.87 18.76a1 1 0 1 0-1.74 1A13 13 0 0 0 44 20a1 1 0 0 0 .33-1.94z"/>
    <path fill="#fff" d="M26 16.29a1 1 0 0 0-1.12 1.63 7 7 0 0 0 14.24 0A1 1 0 0 0 38 16.29a5 5 0 0 1-12 0z"/>
    <path fill="#ff81ae" d="M49 60H15a1 1 0 0 1-1-1V43c0-8.27 6.73-15 15-15h4c8.27 0 15 6.73 15 15v16a1 1 0 0 1-1 1z"/>
    <path fill="#fff" d="M48 59H16a1 1 0 0 1-1-1V43c0-7.72 6.28-14 14-14h4c7.72 0 14 6.28 14 14v15a1 1 0 0 1-1 1z"/>
    <path fill="#c94779" d="M36 41H28a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2z"/>
    <path fill="#c94779" d="M32 46a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2z"/>
  </svg>
);

export const ChildIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" {...props}>
    <path fill="#f5e0a0" d="M32 26a11 11 0 1 0 0-22 11 11 0 0 0 0 22z"/>
    <path fill="#454545" d="M38 6a1 1 0 0 0-1-1h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1zM28 6a1 1 0 0 0-1-1h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1z"/>
    <path fill="#fff" d="M26 14.29a1 1 0 0 0-1.12 1.63 5 5 0 0 0 10.24 0A1 1 0 0 0 34 14.29a3 3 0 0 1-8 0z"/>
    <path fill="#82d87a" d="M47 56H17a1 1 0 0 1-1-1V41c0-7.17 5.83-13 13-13h4c7.17 0 13 5.83 13 13v14a1 1 0 0 1-1 1z"/>
    <path fill="#fff" d="M46 55H18a1 1 0 0 1-1-1V41c0-6.62 5.38-12 12-12h4c6.62 0 12 5.38 12 12v13a1 1 0 0 1-1 1z"/>
    <path fill="#2e9a22" d="M36 37H28a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2z"/>
    <path fill="#2e9a22" d="M32 42a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2z"/>
  </svg>
);

export const GrandfatherIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" {...props}>
        <path fill="#f5e0a0" d="M32 30a13 13 0 1 0 0-26 13 13 0 0 0 0 26z"/>
        <path fill="#d0d0d0" d="M40 9a1 1 0 0 0-1-1H25a1 1 0 0 0 0 2h14a1 1 0 0 0 1-1zM37.17 6a1 1 0 0 0-.33-2 11 11 0 0 0-9.68 0 1 1 0 0 0-.33 2A9 9 0 0 1 37.17 6z"/>
        <path fill="#fff" d="M26 16.29a1 1 0 0 0-1.12 1.63 7 7 0 0 0 14.24 0A1 1 0 0 0 38 16.29a5 5 0 0 1-12 0z"/>
        <path fill="#454545" d="M25 18h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2zM41 18h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2z"/>
        <path fill="#75b2ff" d="M49 60H15a1 1 0 0 1-1-1V43c0-8.27 6.73-15 15-15h4c8.27 0 15 6.73 15 15v16a1 1 0 0 1-1 1z"/>
        <path fill="#fff" d="M48 59H16a1 1 0 0 1-1-1V43c0-7.72 6.28-14 14-14h4c7.72 0 14 6.28 14 14v15a1 1 0 0 1-1 1z"/>
    </svg>
);

export const GrandmotherIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" {...props}>
        <path fill="#f5e0a0" d="M32 30a13 13 0 1 0 0-26 13 13 0 0 0 0 26z"/>
        <path fill="#d0d0d0" d="M41 11a7 7 0 0 0-18 0 1 1 0 0 0 2 0 5 5 0 0 1 14 0 1 1 0 0 0 2 0z"/>
        <path fill="#fff" d="M26 16.29a1 1 0 0 0-1.12 1.63 7 7 0 0 0 14.24 0A1 1 0 0 0 38 16.29a5 5 0 0 1-12 0z"/>
        <circle cx="25" cy="17" r="3" fill="#d0d0d0"/>
        <circle cx="39" cy="17" r="3" fill="#d0d0d0"/>
        <circle cx="25" cy="17" r="1" fill="#fff"/>
        <circle cx="39" cy="17" r="1" fill="#fff"/>
        <path fill="#ff81ae" d="M49 60H15a1 1 0 0 1-1-1V43c0-8.27 6.73-15 15-15h4c8.27 0 15 6.73 15 15v16a1 1 0 0 1-1 1z"/>
        <path fill="#fff" d="M48 59H16a1 1 0 0 1-1-1V43c0-7.72 6.28-14 14-14h4c7.72 0 14 6.28 14 14v15a1 1 0 0 1-1 1z"/>
    </svg>
);

export const PencilIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);

export const BookOpenIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
);

export const SwapIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-4.991-2.691v4.992h-4.992m0 0-3.181-3.183a8.25 8.25 0 0 1 11.667 0l3.181 3.183" />
    </svg>
);

export const CubeIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
);

export const CheckIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);

export const PhotoIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
);

export const MapPinIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
);

export const MagnifyingGlassIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
);

export const ShoppingCartIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.344 1.087-.835l1.838-5.513A1.875 1.875 0 0 0 18.25 6H5.25L4.25 3.75m0 0H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h.75M7.5 14.25 6 16.5m0 0h12m-12 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm12 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" />
    </svg>
);

export const UserIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
);

export const ChefHatIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 4.5c-1.834 0-3.536.6-4.862 1.614M15.362 5.214A8.25 8.25 0 0 0 18.75 10.5c0 2.28-.986 4.358-2.588 5.786M15.362 5.214 12 9.75m3.362-4.536a8.25 8.25 0 0 1 2.588 5.786m0 0c0 2.28-.986 4.358-2.588 5.786m2.588-5.786h3.375c.621 0 1.125.504 1.125 1.125v1.125c0 .621-.504 1.125-1.125 1.125h-3.375M8.638 5.214A8.252 8.252 0 0 0 12 4.5c1.834 0 3.536.6 4.862 1.614M8.638 5.214A8.25 8.25 0 0 1 5.25 10.5c0 2.28.986 4.358 2.588 5.786M8.638 5.214 12 9.75m-3.362-4.536a8.25 8.25 0 0 0-2.588 5.786m0 0c0 2.28.986 4.358 2.588 5.786m-2.588-5.786H2.25c-.621 0-1.125.504-1.125 1.125v1.125c0 .621.504 1.125 1.125 1.125h3.375m0 0c-1.602-1.428-2.588-3.506-2.588-5.786 0-2.28.986-4.358 2.588-5.786M12 21v-8.25" />
    </svg>
);

export const MicrophoneIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 0 1 6 0v8.25a3 3 0 0 1-3 3Z" />
    </svg>
);

export const PaperAirplaneIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);

export const HomeIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
    </svg>
);

export const Cog6ToothIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.008 1.11-1.226.55-.218 1.19-.244 1.705-.078.515.166 1.058.463 1.487.892l2.422 2.421c.429.429.726.972.892 1.487.166.515.14 1.155-.078 1.705-.218.55-.684 1.02-1.226 1.11a17.93 17.93 0 0 1-6.554 0c-.542-.09-1.008-.56-1.226-1.11-.218-.55-.244-1.19-.078-1.705.166-.515.463-1.058.892-1.487l2.422-2.421c.429-.429.972-.726 1.487-.892Zm-2.665 1.48a14.933 14.933 0 0 0-6.812 6.812 1.5 1.5 0 0 0-.275 1.052c.1.59.458 1.093.988 1.343l2.365 1.013c.63.27 1.334.22 1.905-.127l2.83-2.83c.594-.594.594-1.558 0-2.152l-2.83-2.83a1.501 1.501 0 0 0-1.905-.127l-2.365 1.013a1.501 1.501 0 0 0-1.343.988 1.5 1.5 0 0 0 .275 1.052Zm13.63 0a14.933 14.933 0 0 1 6.812 6.812 1.5 1.5 0 0 1 .275 1.052c-.1.59-.458 1.093-.988 1.343l-2.365 1.013c-.63.27-1.334.22-1.905-.127l-2.83-2.83c-.594-.594-.594-1.558 0-2.152l2.83-2.83a1.501 1.501 0 0 1 1.905-.127l2.365 1.013c.53.25.888.753.988 1.343a1.5 1.5 0 0 1-.275 1.052Z" />
    </svg>
);

export const FridgeIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 3.75h13.5a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V5.25a1.5 1.5 0 0 1 1.5-1.5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75" />
    </svg>
);

export const BreakfastIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 18.75h15" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 18.75v-9.375c0-1.24.502-2.375 1.318-3.182A4.5 4.5 0 019 4.5h6a4.5 4.5 0 013.182 1.318c.816.807 1.318 1.942 1.318 3.182V18.75" />
    </svg>
);

export const LunchIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
    </svg>
);

export const AfternoonTeaIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.174C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.174 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
);

export const DinnerIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h8.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75h.008v.008H12v-.008Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75h.008v.008H12v-.008Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9ZM9.75 9.75h4.5v4.5h-4.5v-4.5Z" />
    </svg>
);


export const RestaurantIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export const StarIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const TrashIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.134H8.09a2.09 2.09 0 0 0-2.09 2.134v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);

export const SunIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
);

export const MoonIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>
);

export const LanguageIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.745 14.12 9.062 15 10.5m-6 0h3v5.25m-3-5.25v5.25m0 0v2.25m0 0a48.45 48.45 0 0 1-6 .372m0 0a48.45 48.45 0 0 1-6-.372m6 .372c1.12 0 2.233.038 3.334.114m-3.334-2.475A48.461 48.461 0 0 0 3 5.621" />
    </svg>
);

export const ChatBubbleLeftRightIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.534a.75.75 0 0 1-.634-.218l-1.736-1.736a.75.75 0 0 0-.53-.22H9.75a.75.75 0 0 1-.75-.75V11.25a.75.75 0 0 1 .75-.75h2.25c.414 0 .75-.336.75-.75v-1.5a.75.75 0 0 0-.75-.75H9.75c-1.136 0-2.1.847-2.193 1.98l-.534 3.722a.75.75 0 0 0 .218.634l1.736 1.736a.75.75 0 0 1 .22.53v2.25c0 .414-.336.75-.75.75H5.25a2.25 2.25 0 0 1-2.25-2.25V6.75a2.25 2.25 0 0 1 2.25-2.25h1.5c.414 0 .75.336.75.75v1.5c0 .414.336.75.75.75h4.5c.414 0 .75.336.75.75v1.5c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75v-4.5c0-1.136.847-2.1 1.98-2.193l3.722-.534a.75.75 0 0 1 .634.218l1.736 1.736a.75.75 0 0 0 .53.22h2.25c1.136 0 2.1.847 2.193 1.98l.534 3.722a.75.75 0 0 0-.218.634l-1.736 1.736a.75.75 0 0 1-.53.22Z" />
    </svg>
);
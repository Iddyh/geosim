import React from 'react';

interface IconProps {
  className?: string;
}

export const PythonIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M11.5 8.5a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Zm-1.5 5a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2ZM12 2c-3.1 0-5.4.5-7.1 1.4C3.2 4.3 2 5.8 2 8v8c0 2.2 1.2 3.7 2.9 4.6 1.7.9 4 1.4 7.1 1.4s5.4-.5 7.1-1.4C20.8 19.7 22 18.2 22 16V8c0-2.2-1.2-3.7-2.9-4.6C17.4 2.5 15.1 2 12 2Zm7 14c0 1.1-.6 2-1.5 2.5-.9.4-2.8.9-5.5.9s-4.6-.4-5.5-.9C5.6 18 5 17.1 5 16v-2.5c.2 0 .4 0 .5.1 1.4.3 2.9.5 4.5.5s3.1-.2 4.5-.5c.2 0 .3-.1.5-.1V16Zm0-4.5c-.2 0-.4 0-.5.1-1.4.3-2.9.5-4.5.5s-3.1-.2-4.5-.5c-.2 0-.3-.1-.5-.1V8c0-1.1.6-2 1.5-2.5.9-.4 2.8-.9 5.5-.9s4.6.4 5.5.9c.9.5 1.5 1.4 1.5 2.5v3.5Z" />
  </svg>
);

export const CopyIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
    />
  </svg>
);

export const CheckIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export const VideoIcon = ({ className }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-1.128c0-.431.19-.824.508-1.093l4.288-3.43a1.5 1.5 0 0 0 0-2.398l-4.288-3.43A1.5 1.5 0 0 0 16.5 7.628V6.5a3 3 0 0 0-3-3h-9Z" />
  </svg>
);

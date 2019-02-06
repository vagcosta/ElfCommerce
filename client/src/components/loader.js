import React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = props => {
  return (
    <ContentLoader
      height={200}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ddd"
    >
      <rect x="25" y="15" rx="4" ry="4" width="359" height="12" />
      <rect x="25" y="40" rx="4" ry="4" width="359" height="15" />
      <rect x="25" y="70" rx="4" ry="4" width="359" height="15" />
      <rect x="25" y="100" rx="4" ry="4" width="359" height="15" />
      <rect x="25" y="130" rx="4" ry="4" width="359" height="15" />
      <rect x="25" y="160" rx="4" ry="4" width="359" height="15" />
    </ContentLoader>
  );
};

const ProfileLoader = props => (
  <ContentLoader
    height={280}
    width={600}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ddd"
  >
    <rect x="14.33" y="32.61" rx="0" ry="0" width="0" height="0" />
    <rect x="12.53" y="29.61" rx="0" ry="0" width="0" height="0" />
    <rect x="44.53" y="54.61" rx="0" ry="0" width="0" height="1" />
    <rect x="44.53" y="54.61" rx="0" ry="0" width="0" height="0" />
    <rect x="170" y="18.63" rx="0" ry="0" width="380" height="200" />
    <rect x="10.63" y="18.61" rx="0" ry="0" width="72" height="72" />
  </ContentLoader>
);

const ParallelLoader = props => (
  <ContentLoader
    rtl
    height={280}
    width={600}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ddd"
    {...props}
  >
    <rect x="14.33" y="32.61" rx="0" ry="0" width="0" height="0" />
    <rect x="12.53" y="29.61" rx="0" ry="0" width="0" height="0" />
    <rect x="44.53" y="54.61" rx="0" ry="0" width="0" height="1" />
    <rect x="44.53" y="54.61" rx="0" ry="0" width="0" height="0" />
    <rect x="320" y="18" rx="0" ry="0" width="190" height="100" />
    <rect x="10.63" y="18" rx="0" ry="0" width="260" height="209.72" />
    <rect x="320" y="128" rx="0" ry="0" width="190" height="80" />
  </ContentLoader>
);

export {
  Loader,
  ProfileLoader,
  ParallelLoader,
};
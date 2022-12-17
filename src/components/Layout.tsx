import React from 'react';
import Box, { BoxProps } from '@mui/joy/Box';
import { Card, CardProps } from '@mui/joy';
import { Desktop, Mobile } from '../utils/Responsive';

function Root(props: BoxProps) {
  return (
    <>
      <Desktop>
        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: 'auto 1fr',
            gridTemplateAreas: `
          "navbar"
          "main"
        `,
            height: '100vh',
          }}
          {...props}
        />
      </Desktop>
      <Mobile>
        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: 'auto 1fr',
            gridTemplateAreas: `
          "navbar"
          "main"
        `,
            height: '100vh',
          }}
          {...props}
        />
      </Mobile>
    </>
  );
}

function Header(props: BoxProps) {
  return (
    <Box
      sx={{
        gridArea: 'navbar',
        bgcolor: 'background.surface',
        color: 'primary.contrastText',
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'center',
        p: 2,
        gap: 2,
      }}
      {...props}
    />
  );
}

function Main(props: BoxProps) {
  return (
    <Box
      sx={{
        gridArea: 'main',
        overflow: 'auto',
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        p: 2,
      }}
      {...props}
    />
  );
}

function Tile(props: CardProps) {
  return (
    <Card
      sx={{
        p: 2,
        m: 2,
        bgcolor: 'background.surface',
        color: 'text.primary',
        flexGrow: 1,
        flexShrink: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...props}
    />
  );
}

const Layout = {
  Root,
  Header,
  Tile,
  Main,
};

export default Layout;
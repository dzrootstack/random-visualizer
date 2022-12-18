import React from 'react';
import Box, { BoxProps } from '@mui/joy/Box';
import { Card, CardProps } from '@mui/joy';
import { Default, Mobile } from '../utils/Responsive';

function Root(props: BoxProps) {
  return (
    <>
      <Default>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '50% 50%',
            gridTemplateAreas: `
            "sidebar main"
          `,
            height: '100vh',
          }}
          {...props}
        />
      </Default>
      <Mobile>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: "auto"
          }}
          {...props}
        />
      </Mobile>
    </>
  );
}

function Sidebar(props: CardProps) {
  return (
    <>
      <Default>
        <Card
          sx={{
            gridArea: 'sidebar',
            bgcolor: 'background.surface',
            color: 'text.primary',
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            m: 2,
            mr: 0,
            gap: 2,
          }}
          {...props}
        />
      </Default>
      <Mobile>
        <Card
          sx={{
            gridArea: 'sidebar',
            bgcolor: 'background.surface',
            color: 'text.primary',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            p: 2,
            m: 2,
            mr: 0,
            gap: 2,
          }}
          {...props}
        />
      </Mobile>
    </>
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
        flexDirection: 'column',
        overflowY: 'auto',
        p: 2,
        gap: 2,
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
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
      }}
      {...props}
    />
  );
}

const Layout = {
  Root,
  Sidebar,
  Tile,
  Main,
};

export default Layout;
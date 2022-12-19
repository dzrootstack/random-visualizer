import React from 'react';
import Box, { BoxProps } from '@mui/joy/Box';
import { Card, CardProps, Sheet, SheetProps } from '@mui/joy';
import { Default, Mobile } from '../utils/Responsive';

function Root(props: BoxProps) {
  const sx = {
    display: 'grid',
    height: '100vh',
    width: '100vw',
  };
  
  return (
    <>
      <Default>
        <Box
          sx={{
            ...sx,
            gridTemplateColumns: '50% 50%',
            gridTemplateRows: '100%',
            gridTemplateAreas: `
            "sidebar main"
          `,
          }}
          {...props}
        />
      </Default>
      <Mobile>
        <Box
          sx={{
            ...sx,
            gridTemplateColumns: '100%',
            gridTemplateRows: '50% 50%',
            gridTemplateAreas: `
            "sidebar"
            "main"
          `,
          }}
          {...props}
        />
      </Mobile>
    </>
  );
}

function Sidebar(props: SheetProps) {
  const sx = {
    gridArea: 'sidebar',
    bgcolor: 'background.surface',
    color: 'text.primary',
    display: 'flex',
    p: 2,
    gap: 2,
  };
  
  return (
    <>
      <Default>
        <Sheet
          sx={{
            ...sx,
            flexDirection: 'column',
          }}
          {...props}
        />
      </Default>
      <Mobile>
        <Sheet
          sx={{
            ...sx,
            flexDirection: 'row',
            flexWrap: 'wrap',
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
        overflowY: 'auto',
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
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
        bgcolor: 'background.surface',
        color: 'text.primary',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "600px",
        flexShrink: 0,
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
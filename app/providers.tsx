"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

export function Providers({ children, themeProps }: ProvidersProps) {
	const router = useRouter();

	return (
		<NextUIProvider navigate={router.push}>
			<NextThemesProvider {...themeProps}>
				<ThemeProvider theme={darkTheme}>
					<CssBaseline />
					{children}
				</ThemeProvider>
			</NextThemesProvider>
		</NextUIProvider>
	);
}

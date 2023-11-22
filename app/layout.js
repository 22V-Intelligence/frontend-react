'use client';
import Header from './components/Header';
import Footer from './components/Footer';
import { useLayoutEffect, useRef } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const inter = Inter({ subsets: ['latin'] });

import StyledComponentsRegistry from '../lib/registry';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout(props) {
	const { children } = props;
	const pathname = usePathname();
	const mainref = useRef();
	const smoother = useRef();

	useLayoutEffect(() => {
		const ctx = gsap.context((self) => {
			// create the smooth scroller FIRST!
			smoother.current = ScrollSmoother.create({
				smooth: 2, // seconds it takes to "catch up" to native scroll position
				effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
			});
		}, mainref);
		return () => ctx.revert();
	}, []);

	return (
		<html lang="en">
			<body className={inter.className} data-page={pathname}>
				<StyledComponentsRegistry>
					<SessionProvider>
						<div
							id="smooth-wrapper"
							ref={mainref}
							data-scroll-container
						>
							<div
								data-scroll
								data-scroll-sticky
								data-scroll-target="#smooth-wrapper"
							>
								<Header />
							</div>
							<div id="smooth-content">
								<main>{children}</main>
								<Footer />
							</div>
						</div>
					</SessionProvider>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}

import { resolve } from 'node:path';
import type { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from 'vite';
import turbosnap from 'vite-plugin-turbosnap';
const config = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-links',
		'@storybook/addon-storysource',
		resolve(__dirname, '../node_modules/storybook-addon-misskey-theme'),
	],
	framework: {
		name: '@storybook/vue3-vite',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	core: {
		disableTelemetry: true,
	},
	async viteFinal(config) {
		return mergeConfig(config, {
			plugins: [
				turbosnap({
					rootDir: config.root ?? process.cwd(),
				}),
			],
			build: {
				target: [
					'chrome108',
					'firefox109',
					'safari16',
				],
			},
		});
	},
} satisfies StorybookConfig;
export default config;

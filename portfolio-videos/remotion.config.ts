import { Config } from '@remotion/cli/config';

// Screenshots live in assets/<product>/ and are served as static files.
Config.setPublicDir('./assets');
Config.setVideoImageFormat('jpeg');

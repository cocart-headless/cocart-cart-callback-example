module.exports = function(grunt) {
	'use strict';

	require( 'load-grunt-tasks' )( grunt );

	// Project configuration.
	grunt.initConfig(
		{
			pkg: grunt.file.readJSON( 'package.json' ),

			// Generate .pot file
			makepot: {
				target: {
					options: {
						cwd: '',
						domainPath: 'languages',                                  // Where to save the POT file.
						exclude: [
							'releases',
							'node_modules',
							'vendor'
						],
						mainFile: '<%= pkg.name %>.php', // Main project file.
						potComments: 'Copyright (c) {year} CoCart Headless, LLC\nThis file is distributed under the same license as the CoCart package.', // The copyright at the beginning of the POT file.
						potFilename: '<%= pkg.name %>.pot', // Name of the POT file.
						potHeaders: {
							'poedit': true,                                       // Includes common Poedit headers.
							'x-poedit-keywordslist': true,                        // Include a list of all possible gettext functions.
							'Report-Msgid-Bugs-To': 'support@cocartapi.com',
							'language-team': 'CoCart Headless, LLC <support@cocartapi.com>',
							'language': 'en_US'
						},
						processPot: function( pot ) {
							var translation,
							excluded_meta = [
								'Plugin Name of the plugin/theme',
								'Plugin URI of the plugin/theme',
								'Description of the plugin/theme',
								'Author of the plugin/theme',
								'Author URI of the plugin/theme'
							];

							for ( translation in pot.translations[''] ) {
								if ( 'undefined' !== typeof pot.translations[''][ translation ].comments.extracted ) {
									if ( excluded_meta.indexOf( pot.translations[''][ translation ].comments.extracted ) >= 0 ) {
										console.log( 'Excluded meta: ' + pot.translations[''][ translation ].comments.extracted );
										delete pot.translations[''][ translation ];
									}
								}
							}

							return pot;
						},
						type: 'wp-plugin',                                        // Type of project.
						updateTimestamp: true,                                    // Whether the POT-Creation-Date should be updated without other changes.
					}
				}
			},

			// Check strings for localization issues
			checktextdomain: {
				options:{
					text_domain: '<%= pkg.name %>', // Project text domain.
					keywords: [
						'__:1,2d',
						'_e:1,2d',
						'_x:1,2c,3d',
						'esc_html__:1,2d',
						'esc_html_e:1,2d',
						'esc_html_x:1,2c,3d',
						'esc_attr__:1,2d',
						'esc_attr_e:1,2d',
						'esc_attr_x:1,2c,3d',
						'_ex:1,2c,3d',
						'_n:1,2,4d',
						'_nx:1,2,4c,5d',
						'_n_noop:1,2,3d',
						'_nx_noop:1,2,3c,4d'
					]
				},
				files: {
					src:  [
						'*.php',
						'**/*.php', // Include all files
						'!node_modules/**', // Exclude node_modules/
						'!vendor/**' // Exclude vendor/
					],
					expand: true
				},
			},

			potomo: {
				dist: {
					options: {
						poDel: false
					},
					files: [{
						expand: true,
						cwd: 'languages',
						src: ['*.po'],
						dest: 'languages',
						ext: '.mo',
						nonull: false
					}]
				}
			},

			// Bump version numbers (replace with version in package.json)
			replace: {
				php: {
					src: [
						'<%= pkg.name %>.php',
						'includes/class-<%= pkg.name %>.php'
					],
					overwrite: true,
					replacements: [
						{
							from: /Description:.*$/m,
							to: "Description: <%= pkg.description %>"
						},
						{
							from: /Requires at least:.*$/m,
							to: "Requires at least: <%= pkg.requires %>"
						},
						{
							from: /Requires PHP:.*$/m,
							to: "Requires PHP: <%= pkg.requires_php %>"
						},
						{
							from: /Tested up to:.*$/m,
							to: 'Tested up to: <%= pkg.tested_up_to %>'
						},
						{
							from: /CoCart requires at least:.*$/m,
							to: 'CoCart requires at least: <%= pkg.cocart_requires %>'
						},
						{
							from: /CoCart tested up to:.*$/m,
							to: 'CoCart tested up to: <%= pkg.cocart_tested_up_to %>'
						},
						{
							from: /Version:.*$/m,
							to: "Version:     <%= pkg.version %>"
						},
						{
							from: /public static \$version = \'.*.'/m,
							to: "public static $version = '<%= pkg.version %>'"
						}
					]
				},
				readme: {
					src: [
						'readme.txt',
					],
					overwrite: true,
					replacements: [
						{
							from: /Requires at least:(\*\*|)(\s*?)[0-9.-]+(\s*?)$/mi,
							to: 'Requires at least:$1$2<%= pkg.requires %>$3'
						},
						{
							from: /Requires PHP:(\*\*|)(\s*?)[0-9.-]+(\s*?)$/mi,
							to: 'Requires PHP:$1$2<%= pkg.requires_php %>$3'
						},
						{
							from: /Tested up to:(\*\*|)(\s*?)[0-9.-]+(\s*?)$/mi,
							to: 'Tested up to:$1$2<%= pkg.tested_up_to %>$3'
						},
						{
							from: /WC requires at least:(\*\*|)(\s*?)[0-9.-]+(\s*?)$/mi,
							to: 'WC requires at least:$1$2<%= pkg.wc_requires %>$3'
						},
						{
							from: /WC tested up to:(\*\*|)(\s*?)[a-zA-Z0-9.-]+(\s*?)$/mi,
							to: 'WC tested up to:$1$2<%= pkg.wc_tested_up_to %>$3'
						},
					]
				},
				stable: {
					src: [
						'readme.txt',
					],
					overwrite: true,
					replacements: [
						{
							from: /Stable tag:(\*\*|)(\s*?)[0-9.-]+(\s*?)$/mi,
							to: 'Stable tag:$1$2<%= pkg.version %>$3'
						},
					]
				}
			},

			// Copies the plugin to create deployable plugin.
			copy: {
				build: {
					files: [
						{
							expand: true,
							src: [
								'**',
								'!.*',
								'!**/*.{gif,jpg,jpeg,js,json,log,lock,md,png,scss,sh,txt,xml,zip}',
								'!.*/**',
								'!.DS_Store',
								'!.htaccess',
								'!node_modules/**',
								'!releases/**',
								'!vendor/**',
								'!unit-tests/**',
								'readme.txt'
							],
							dest: 'build/',
							dot: true
						}
					]
				}
			},

			// Compresses the deployable plugin folder.
			compress: {
				zip: {
					options: {
						archive: './releases/<%= pkg.name %>-v<%= pkg.version %>.zip',
						mode: 'zip'
					},
					files: [
						{
							expand: true,
							cwd: './build/',
							src: '**',
							dest: '<%= pkg.name %>'
						}
					]
				}
			},

			// Deletes the deployable plugin folder once zipped up.
			clean: {
				build: [ 'build/' ]
			}
		}
	);

	// Set the default grunt command to run test cases.
	grunt.registerTask( 'default', [ 'test' ] );

	// Checks for developer dependencies updates.
	grunt.registerTask( 'check', [ 'devUpdate' ] );

	// Checks for errors.
	grunt.registerTask( 'test', [ 'checktextdomain' ] );

	// Update version of plugin.
	grunt.registerTask( 'version', [ 'replace:php', 'replace:readme' ] );

	// Update stable version of plugin.
	grunt.registerTask( 'stable', [ 'replace:stable' ] );

	/**
	 * Run i18n related tasks.
	 *
	 * This includes extracting translatable strings, updating the master pot file.
	 * If this is part of a deploy process, it should come before zipping everything up.
	 */
	grunt.registerTask( 'update-pot', [ 'checktextdomain', 'makepot' ] );

	/**
	 * Creates a deployable plugin zipped up ready to upload
	 * and install on a WordPress installation.
	 */
	grunt.registerTask( 'zip', [ 'copy:build', 'compress', 'clean:build' ] );
};

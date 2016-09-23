/*
 Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.plugins.add( 'insertpre',
	{
		requires: 'dialog',
		lang : 'en,pl', // %REMOVE_LINE_CORE%
		icons: 'insertpre', // %REMOVE_LINE_CORE%
		onLoad : function()
		{
			if ( CKEDITOR.config.insertpre_class )
			{
				CKEDITOR.addCss(
					'pre.' + CKEDITOR.config.insertpre_class + ' {' +
						CKEDITOR.config.insertpre_style +
						'}'
				);
			}
		},
		init : function( editor )
		{
			// allowed and required content is the same for this plugin
			var required = CKEDITOR.config.insertpre_class ? ( 'pre( ' + CKEDITOR.config.insertpre_class + ' )' ) : 'pre';
			editor.addCommand( 'insertpre', new CKEDITOR.dialogCommand( 'insertpre', {
				allowedContent : required,
				requiredContent : required
			} ) );
			editor.ui.addButton && editor.ui.addButton( 'InsertPre',
				{
					label : editor.lang.insertpre.title,
					icon : this.path + 'icons/insertpre.png',
					command : 'insertpre',
					toolbar: 'insert,99'
				} );

			if ( editor.contextMenu )
			{
				editor.addMenuGroup( 'code' );
				editor.addMenuItem( 'insertpre',
					{
						label : editor.lang.insertpre.edit,
						icon : this.path + 'icons/insertpre.png',
						command : 'insertpre',
						group : 'code'
					});
				editor.contextMenu.addListener( function( element )
				{
					if ( element )
						element = element.getAscendant( 'pre', true );
					if ( element && !element.isReadOnly() && element.hasClass( editor.config.insertpre_class ) )
						return { insertpre : CKEDITOR.TRISTATE_OFF };
					return null;
				});
			}

			CKEDITOR.dialog.add( 'insertpre', function( editor )
			{
				return {
					title : editor.lang.insertpre.title,
					minWidth : 540,
					minHeight : 380,
					contents : [
						{
							id : 'general',
							label : editor.lang.insertpre.code,
							elements : [
								{
									type: 'select',
									id: 'language',
									label: editor.lang.insertpre.lang,
									items: [['default'], ['bsh'], ['c'], ['cc'], ['py'], ['cpp'], ['cs'], ['csh'], ['cyc'],
											['cv'], ['htm'], ['html'], ['java'], ['js'], ['m'], ['mxml'], ['perl'],
											['pl'], ['pm'], ['py'], ['rb'], ['sh'], ['xhtml'], ['xml'], ['xsl']],
									'default': 'default',
									setup : function ( element ) {
										var classes = element.getAttribute('class');
										var classesList = classes.split(" ");
										for (var i = 0; i < classesList.length; ++i)
										{
											if (classesList[i].indexOf('lang-') >= 0)
											{
												var lang = classesList[i].substr(5);
												this.setValue(lang);
											}
										}
									}
								},
								{
									type: 'checkbox',
									id: 'linenums',
									label: editor.lang.insertpre.linenums,
									'default': '',
									setup : function( element ) {
										if (element.getAttribute('class').indexOf('linenums') >= 0)
											this.setValue( true );
									}
								},
								{
									type : 'textarea',
									id : 'contents',
									label : editor.lang.insertpre.code,
									cols: 140,
									rows: 22,
									validate : CKEDITOR.dialog.validate.notEmpty( editor.lang.insertpre.notEmpty ),
									required : true,
									setup : function( element )
									{
										var html = element.getHtml();
										if ( html )
										{
											var div = document.createElement( 'div' );
											div.innerHTML = html;
											this.setValue( div.firstChild.nodeValue );
										}
									},
									commit : function( element )
									{
										element.setHtml( CKEDITOR.tools.htmlEncode( this.getValue() ) );
									}
								}
							]
						}
					],
					onShow : function()
					{
						var sel = editor.getSelection(),
							element = sel.getStartElement();
						if ( element )
							element = element.getAscendant( 'pre', true );

						if ( !element || element.getName() != 'pre' || !element.hasClass( editor.config.insertpre_class ) )
						{
							element = editor.document.createElement( 'pre' );
							this.insertMode = true;
						}
						else
							this.insertMode = false;

						this.pre = element;
						this.setupContent( this.pre );
					},
					onOk : function()
					{
						var lang = this.getValueOf('general', 'language');
						var linenums = this.getValueOf('general', 'linenums')
						var classes = '';

						if ( editor.config.insertpre_class )
							classes += editor.config.insertpre_class;

						if (lang != 'default')
							classes += ' lang-' + lang;

						if ( linenums )
							classes += ' linenums';

						this.pre.setAttribute( 'class', classes);

						if ( this.insertMode )
							editor.insertElement( this.pre );

						this.commitContent( this.pre );
					}
				};
			} );
		}
	} );

if (typeof(CKEDITOR.config.insertpre_style) == 'undefined')
	CKEDITOR.config.insertpre_style = 'background-color:#F8F8F8;border:1px solid #DDD;padding:10px;';
if (typeof(CKEDITOR.config.insertpre_class)  == 'undefined')
	CKEDITOR.config.insertpre_class = 'prettyprint';
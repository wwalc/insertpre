CKEditor Insert &lt;pre&gt; Plugin
===============================

This plugin makes it easier to insert a `<pre>` tag into CKEditor.

Installation
------------

1. Clone/copy the contents of this repository into a new `plugins/insertpre` folder of your CKEditor installation.
2. Enable the `insertpre` plugin in the CKEditor configuration file (`config.js`):

        config.extraPlugins = 'insertpre';

That's all. The **InsertPre** button will appear on the editor toolbar and will be ready to use.

3. Optionally, you may specify which class should be added to the `<pre>` element:

        CKEDITOR.config.insertpre_class = 'prettyprint';

   As well as specify how the `<pre>` tag should be rendered inside CKEditor:
   
		CKEDITOR.config.insertpre_style = 'background-color:#F8F8F8;border:1px solid #DDD;padding:10px;';

License
-------

Licensed under the terms of any of the following licenses of your choice: [GPL](http://www.gnu.org/licenses/gpl.html), [LGPL](http://www.gnu.org/licenses/lgpl.html) and [MPL](http://www.mozilla.org/MPL/MPL-1.1.html).

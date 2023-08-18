# Web-Filter

This project allows a user to filter out content from a local website by specifying certain words or phrases that would indicate content that they do not wish to see.    
There are two ways to run the extension:    
1. Add the extension temporarily by going to about:config in Firefox, clicking on "This Firefox" on the left, and then clicking on "Load Temporary Add-on..." and navigating to the manifest.json file for the project.    
2. Use web-ext build to compress the extension into a zip file, and then change the file extension from .zip to .xpi. Open Firefox Nightly or Developer Edition (developer edition is currently broken), and change the xpinstall.signatures.required setting in about:config to false. You need to use Nightly becuase stable still won't let you load unsigned add-ons even if you change this. Then, go to the Add-ons Manager and click the cog, then click Install Add-on from File in the drop-down menu.

The extension currently only runs on https://www.gnu.org/ for testing purposes, but you can easily change the URL in the manifest.json file to "<all_urls>" and the filter will apply to every page.


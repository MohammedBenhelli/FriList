/* 
    Description: Android Application Get Env information
    Usage: frida -U -f XXX -l android-get-app-env-info.js
    Credit: @mobilesecurity_
*/

Java.perform(function() 
{
    var context = null
    var ActivityThread = Java.use('android.app.ActivityThread');
    var targetApp = ActivityThread.currentApplication();

    if (targetApp != null) 
    {
        context = targetApp.getApplicationContext();

        var env = 
        {
            mainDirectory: context.getFilesDir().getParent(),
            filesDirectory: context.getFilesDir().getAbsolutePath().toString(),
            cacheDirectory: context.getCacheDir().getAbsolutePath().toString(),
            externalCacheDirectory: context.getExternalCacheDir().getAbsolutePath().toString(),
            codeCacheDirectory: 
                'getCodeCacheDir' in context ? 
                context.getCodeCacheDir().getAbsolutePath().toString() : 'N/A',
            obbDir: context.getObbDir().getAbsolutePath().toString(),
            packageCodePath: context.getPackageCodePath().toString(),
        };

        send("******************* App Environment Info *******************")
        send("mainDirectory: "+env.mainDirectory);
        send("filesDirectory: "+env.filesDirectory);
        send("cacheDirectory: "+env.cacheDirectory);
        send("externalCacheDirectory: "+env.externalCacheDirectory);
        send("codeCacheDirectory: "+env.codeCacheDirectory);
        send("obbDir: "+env.obbDir);
        send("packageCodePath: "+env.packageCodePath);
        send("************************************************************")
    } 
    else 
        console.log("Error: App Environment Info - N/A")

});
const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');
const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream= rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});
const development={
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'placement-cell-interface',
    morgan:{
        mode:'dev',
        options:{stream: accessLogStream}
    }

}
const production={
    name:'production',
    name:process.env.placement_assets_path,
    asset_path:'./assets',
    session_cookie_key:process.env.placement_session_cookie_key,
    db:'placement-cell-interface',
    morgan:{
        mode:'combined',
        options:{stream: accessLogStream}
    }
}

module.exports=eval(process.env.placement_environment)==undefined ? development:eval(process.env.placement_environment);
/**
 * Created by tonyjiang on 16/1/21.
 */


//图片整合
fis.media('prod')
    .match('::package' , {
    //packager : fis.plugin('map'),
    spriter : fis.plugin('csssprites')
}).match('*.css' , {
    useSprite : true
}).match('*.{png,jpg,js,css}' , {
    release : '/resource/$0'
});

fis.media('compile').match('*.{js,css,png}' , {
    useHash : false,
    useSprite : false,
    optimizer : null
});

fis.match('*' , {
    deploy : fis.plugin('local-deliver', {
      to : '../fis_output'
    })
});
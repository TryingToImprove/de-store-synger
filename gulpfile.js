var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var merge = require('merge-stream');

gulp.task('default', function() {
    var templateData = {
        songs: [
            {
                id: "hodja-fra-pjort--ulige-numre",
                title: 'Hodja Fra Pjort',
                artist: 'Ulige numre',
                coverImageUrl: 'hodjafrapjort_logo.jpg',
                youtubeId: 'WGt1BiV_ZVE'
            },
            {
                id: "min-kat-den-danser-tango--ida-corr",
                title: 'Min Kat Den Danser Tango',
                artist: 'Ida Corr',
                coverImageUrl: 'minkat_logo.jpg',
                youtubeId: 'gd6BIRo3XQE'
            },
            {
                id: "tyggegummikongen-bobbel--annika-aakjaer",
                title: 'Tyggegummikongen Bobbel',
                artist: 'Annika Aakjær',
                coverImageUrl: 'tyggegummikongen_logo.jpg',
                youtubeId: 'bWpbVY1M-Ck'
            },
            {
                id: "tarzan-mama-mia--freja-loeb",
                title: 'Tarzan Mama Mia',
                artist: 'Freja Loeb',
                coverImageUrl: 'tarzanmamamia_logo.jpg',
                youtubeId: '_ueB0lB0F3k'
            },
            {
                id: "i-en-skov-en-hytte-laa--panamah",
                title: 'I En Skov En Hytte Lå',
                artist: 'Panamah',
                coverImageUrl: 'ienskov_logo.jpg',
                youtubeId: '30Qtra9Z4r4'
            },
            {
                id: "mit-allerfarligste-sted--wafande",
                title: 'Mit Allerfarligste Sted',
                artist: 'Wafande',
                coverImageUrl: 'allerfarligste_logo.jpg',
                youtubeId: 'ZNQGr9WcfY8'
            },
            {
                id: "solen-er-saa-roed-mor--tue-west",
                title: 'Solen Er Så Rød Mor',
                artist: 'Tue West',
                coverImageUrl: 'solen_rgb_logo.jpg',
                youtubeId: 'wMsZvOefRa0'
            },
            {
                id: "elefantens-vuggevise--sys-bjerre",
                title: 'Elefantens Vuggevise',
                artist: 'Sys Bjerre',
                coverImageUrl: 'elefantensvuggevise_logo.jpg',
                youtubeId: 'NZeLCFGXkcs'
            },
            {
                id: "pjerrot-sagde-til-maanen--julie-maria",
                title: 'Pjerrot Sagde Til Månen',
                artist: 'Julie Maria',
                coverImageUrl: 'pjerrotsagde_logo.jpg',
                youtubeId: '5piJodxwBxg'
            },
            {
                id: "i-skovens-dybe-stille-ro--rebekkamaria",
                title: 'I Skovens Dybe Stille Ro',
                artist: 'RebekkaMaria',
                coverImageUrl: 'iskovensdybe_logo.jpg',
                youtubeId: 'HxJuNQTRL44'
            }
        ]
    },
    options = {
        ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
        helpers : {
            capitals : function(str){
                return str.toUpperCase();
            }
        }
    }

    var templating = gulp
        .src('src/index.handlebars')
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'));
    
    var copy = gulp
        .src('./src/content/**', { base: "./src/content/" })
        .pipe(gulp.dest('dist/content'));
    
    var copyFavicon = gulp
        .src('./src/favicon.ico', { base: "./src/" })
        .pipe(gulp.dest('dist/'));
              
    return merge(templating, copy, copyFavicon);
});
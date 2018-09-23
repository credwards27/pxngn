/* gulpfile.babel.js
    
    Gulp configuration.
*/

// Gulp dependencies
const gulp = require("gulp"),
    sourcemaps = require("gulp-sourcemaps"),
    changed = require("gulp-changed"),
    plumber = require("gulp-plumber"),
    
    // JS build dependencies
    babel = require("gulp-babel"),
    
    // Other dependencies
    del = require("del");

// Environment flags.
var env = {
    // Environment paths.
    PATH: {
        // Source paths.
        SRC: {
            // Generic build source path root.
            ROOT: "src"
        },
        
        // Destination output paths.
        DEST: {
            // Generic build output path root.
            ROOT: "dist"
        }
    },
    
    // Flag to specify that the current task sequence is for production.
    prodMode: false
},
    
    // Collection of task handler functions.
    tasks = {
        /* Makes all subsequent tasks run in production mode (if supported).
        */
        "prod-mode": function() {
            env.prodMode = true;
        },
        
        /* Watches the project for changes and recompiles.
        */
        watch: function() {
            gulp.watch(env.PATH.SRC.ROOT + "/**/*.js", gulp.series("js"));
        },
        
        /* Clears the build destination directories for a clean build.
        */
        clean: function() {
            return del([
                env.PATH.DEST.ROOT + "/**/*"
            ]);
        },
        
        /* JS build task.
        */
        js: function() {
            var action = gulp.src(env.PATH.SRC.ROOT + "/**/*.js")
                .pipe(plumber({
                    errorHandler: (err) => {
                        console.error(err);
                    }
                }));
            
            if (!env.prodMode) {
                action = action.pipe(sourcemaps.init());
            }
            
            action = env.prodMode ? action : action.pipe(sourcemaps.init());
            
            action = action
                .pipe(changed(env.PATH.DEST.ROOT))
                .pipe(babel());
            
            action = env.propMode ? action : action.pipe(sourcemaps.write("."));
            
            return action.pipe(gulp.dest(env.PATH.DEST.ROOT));
        },
        
        // Production build task
        deploy: {
            series: [ "clean", "prod-mode", "js" ]
        },
        
        //
        // Aliases
        //
        
        w: [ "watch" ],
        
        // Default gulp task.
        default: [ "js", "watch" ]
    };

// Set up paths
(function() {
    var paths = env.PATH,
        groups = [ "SRC", "DEST" ],
        group, root, path, k, i, l;
    
    for (i=0, l=groups.length; i<l; ++i) {
        group = env.PATH[groups[i]];
        root = group.ROOT = group.ROOT.replace(/\/+$/, "");
        
        for (k in group) {
            if (!group.hasOwnProperty(k) || "ROOT" === k) { continue; }
            
            path = group[k].replace(/^\/+/, "");
            group[k] = root + "/" + path;
        }
    }
})();

// Link tasks with handlers
(function() {
    var curr, k;
    
    for (k in tasks) {
        if (tasks.hasOwnProperty(k)) {
            curr = tasks[k];
            
            if (typeof curr === "function") {
                // Normal case, regular handler
                gulp.task(k, curr);
                continue;
            }
            else if (curr instanceof Array) {
                curr = { parallel: curr };
            }
            
            // Register the special task group
            let task = curr.task,
                parallel = curr.parallel,
                series = curr.series,
                pre, preMethod;
            
            if (parallel instanceof Array) {
                // Run task dependencies in parallel (unless series also exists)
                pre = parallel;
                preMethod = "parallel";
            }
            
            if (series instanceof Array) {
                // Run task dependencies in series
                pre = pre ? pre.concat(series) : series;
                preMethod = "series";
            }
            
            // Add the actual task function if one exists
            if (typeof task === "function") {
                pre = pre || [];
                pre.push(task);
            }
            
            // Register the task
            if (preMethod) {
                gulp.task(k, gulp[preMethod].apply(undefined, pre));
            }
            else {
                gulp.task(k, task);
            }
        }
    }
})();

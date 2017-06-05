/*
 * This is the App-cluster main controller script. It allocates an application
 * instance to each CPU-core and ensures each instance lives on the correspondent
 * core, thus maxiumizing performance of a single host.
 * 
 * Here you can get a taste of mulit-thread application.
 * Notice the fork() method and 'cluster.isMaster' flag.
 */
var cluster = require('cluster');

function startWorker() {
    var worker = cluster.fork();
    console.log('CLUSTER: Worker %d started', worker.id);
}

// Master cluser controller initialize the worker clusters
if(cluster.isMaster){
    
    // Allocate each cpu core as a cluster worker
    require('os').cpus().forEach(function(){
	    startWorker();
    });

    // log any workers that disconnect; if a worker disconnects, it
    // should then exit, so we'll wait for the exit event to spawn
    // a new worker to replace it
    cluster.on('disconnect', function(worker){
        console.log('CLUSTER: Worker %d disconnected from the cluster.',
            worker.id);
    });

    // when a worker dies (exits), create a worker to replace it
    cluster.on('exit', function(worker, code, signal){
        console.log('CLUSTER: Worker %d died with exit code %d (%s)',
            worker.id, code, signal);
        startWorker();
    });

// Worker cluster starts the application instance
} else {

    // start our app on worker; see meadowlark.js
    require('./meadowlark.js')();

}
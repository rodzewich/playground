Deferred.create().
    getItem("key", (errors, done, result) => {
        done();
    }).
    getKeys((errors, done, result) => {
        done();
    }).
    getLength((errors, done, result) => {
        done();
    }).complete(() => {

    });
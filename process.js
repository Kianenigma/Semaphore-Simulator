var Process = function (idx , schedule ) {

    // constructor
    console.log("creating process" , idx) ;

    this.idx = idx ;

    this.schedule = schedule ;

    var currentSchedule = null ;
    var currentTaskIdx = 0 ;

    var self = this ;

    var _run = function () {
        console.log("Process " + self.idx + " Running its executing routine ") ;
        if ( schedule.length ) {
            currentSchedule = schedule.shift() ;
        }
        else {
            V.clearProcess(self.idx) ;
            return
        }

        if ( currentSchedule.type == "c" ) {
            wait(self , semaphores[currentSchedule.semId] , function () {

                V.critProcess(self.idx) ;

                criticalSection( currentSchedule.duration , function () {
                    signal(self , semaphores[currentSchedule.semId] ) ;

                    V.activateProcess(self.idx ) ;
                    V.finishTask(self.idx , currentTaskIdx) ;
                    currentTaskIdx += 1 ;
                    _run() ;

                }) ;

            }) ;
        }

        else {
            V.activateProcess(self.idx) ;
            nonCriticalSection( currentSchedule.duration , function () {
                V.finishTask(self.idx , currentTaskIdx) ;
                currentTaskIdx += 1 ;
                _run() ;
            })
        }

    } ;

    var criticalSection = function (duration , callback) {
        console.log("Process " + self.idx + " running critical section for " + duration + " ms " ) ;
        window.critical_data.array.push(self.idx) ;
        setTimeout(function () {
            callback() ;
        } , duration )
    } ;


    var nonCriticalSection = function ( duration , callback) {
        console.log("Process " + self.idx + " running Noncritical section for " + duration + " ms " ) ;
        setTimeout(function () {
            callback()
        } , duration ) ;
    } ;

    this.init = function () {
        _run() ;
    } ;


} ;
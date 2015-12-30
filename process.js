var Process = function (idx , schedule ) {

    // constructor
    console.log("creating process" , idx) ;

    this.idx = idx ;

    var schedule = schedule ;

    var currentSchedule = null ;

    var self = this ;


    var _run = function () {
        console.log("Process " + self.idx + " Running its executing routine " , schedule) ;
        if ( schedule.length ) {
            currentSchedule = schedule.shift() ;
        }
        else {
            return
        }

        if ( currentSchedule.type == "c" ) {
            wait(self , mutex , function () {
                criticalSection( currentSchedule.duration , function () {
                    signal(self , mutex ) ;
                    _run() ;
                }) ;
            }) ;
        }

        else {
            nonCriticalSection( currentSchedule.duration , function () {
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
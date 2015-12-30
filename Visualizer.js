var Visualizer = function () {
    var $processes = $("#processes") ;
    var $semaphores = $("#semaphores") ;

    this.createProcess = function ( prc ) {
        var _prc = $('<div class="process"> <p> Process ID : ' + prc.idx + ' </p> </div>') ;
        _prc.attr('id' , "process_" + prc.idx ) ;
        for ( var i = 0 ; i < prc.schedule.length ; i++ ) {
            var _task = $('<div class="task" id="process_' + prc.idx + '_task_' + i + '"> <span class="task-type"> ' + ( prc.schedule[i].type == 'n' ? "Normal" : "Critical" ) +  '  </span> <span class="task-dur"> ' + prc.schedule[i].duration + ' </span> </div>')
            _prc.append(_task) ;
        }

        $processes.append(_prc) ;
    } ;


    this.activateProcess = function ( idx ) {
        $("#process_" + idx).removeClass('blocked').removeClass('critical').addClass('active') ;
    } ;


    this.blockProcess = function ( idx ) {
        $("#process_" + idx).removeClass('active').removeClass('critical').addClass('blocked') ;
    } ;

    this.critProcess = function (idx) {
        $("#process_" + idx).removeClass('active').removeClass('blocked').addClass('critical') ;
    } ;


    this.finishTask = function (prcIdx, taskIdx) {
        $("#process_" + prcIdx + "_task_" + taskIdx).addClass('done') ;
    } ; 

    this.clearProcess = function ( idx ) {
        $("#process_" + idx).removeClass('active').removeClass('blocked').removeClass('critical') ;
    } ;


    this.createSemaphore = function ( title ) {
        var _sem = $('<div class="semaphore"><div class="sem-title"> ' + title + ' </div> <div class="semaphore-queue"> </div> </div>')
        _sem.attr('id' , "sem_" + title) ;
        $semaphores.append(_sem) ;
    } ;

    this.push = function (semId, prcId) {
        $("#sem_" + semId + " div.semaphore-queue").append('<div class="queue-item"> ' + prcId + '  </div>') ;
    } ;

    this.pop = function ( semId ) {
        $("#sem_" + semId + " div.semaphore-queue div.queue-item").last().remove() ;
    } ;


} ;
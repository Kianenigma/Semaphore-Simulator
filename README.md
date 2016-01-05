# Semaphore-Simulator
Semaphore simulation . Operation Systems Course Project

# Classes

 ## Process
an abstract Process Class .
takes an ID as identifier and a Schedule Object.
schedule Object is an array of Task Objects.
each Task Object is declared by
+ Type {String} = could be "n" ( normal - non critical ) or "c" ( critical )
+ *Duration* {Int} = task execution time in milliseconds
+ [semId] {String} = name of the Semaphore declared for critical section . shoudl only be defined if Type = "c"

 ## Semaphore
 Simple Abstract semaphore Class . Takes Two parameters .
 + Count : Initial Count
 + name : Name of the Semaphore ( 'mutex' etc .. )

 ## Visualizer
Handles Drawing the processes on DOM.

# Usage
each problem is declared at the end of a `<script></script>` tag placed in `<body></body>` . multiple Processes and semaphore can be created .To Initialize the code you need to warite :

    window.V = new Visualizer() ;
    V.createProcess(P1) ;
    V.createProcess(P2) ;
    V.createProcess(P3) ;

    for ( var sem in window.semaphores ) {
        V.createSemaphore(sem) ;
    }
    
and call the `init()` function of all Processes. Unlimited Count of semaphores and Processes can be created and visualized. **only Limitation** is that each critical code secteion ( reffered to as task) can only be bounded by one semaphore ( access one critical resurce )

# Problems
## Mutual Exclusion over one Resource or One Address Space
    source : index_a.html / index_b.html
Multiple Processes are created with only one semaphore called 'mutex'

    var P1 = new Process(1, [
        {type: "n", duration: 1000},
        {type: "c", duration: 2000, semId: 'mutex'},
        {type: "n", duration: 1000},
        {type: "c", duration: 5000, semId: 'mutex'}
    ]);

    var P2 = new Process(2, [
        {type: "n", duration: 1500},
        {type: "c", duration: 1000, semId: 'mutex'}
    ]);

    var P3 = new Process(3 , [
        { type : 'n' , duration : 1000 },
        { type : 'n' , duration : 1000 },
        { type : 'c' , duration : 1000 , semId: 'mutex'},
        { type : 'n' , duration : 1000 },
        { type : 'c' , duration : 1000 , semId: 'mutex'}
    ]) ;

and a Semaphore **With initial Value 1** Since we only have one Resource or address space.

    window.semaphores = {
            'mutex': new Semaphore(1 , "mutex")
        };

## Mutual Exclusion over Multiple Resources With Multiple Capacities
Same as the last problem . only diffrenece is that if we have n instances of one resource, we set the initial value to the corresponding semaphore to n ( 5 for example )

    window.semaphores = {
        'printer': new Semaphore(5 , "mutex") , // 5 processes can access a printer at most 
        'scanner': new Semaphore(2 , "mutex") // 2 processes can access a scanner at most
    };
    

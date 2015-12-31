# Semaphore-Simulator
Semaphore simulation . Operation Systems Course Project


# Classes
 +Process
    an abstract Process Class .
    takes an ID as identifier and a Schedule Object
    schedule Object is an array of Task Objects
    each Task Object is declared by
    *Type* {String} = could be "n" ( normal - non critical ) or "c" ( critical )
    *Duration* {Int} = task execution time in milliseconds
    [*semId*] {String} = name of the Semaphore declared for critical section . shoudl only be defined if Type = "c"

 +Semaphore
    Simple Abstract semaphore Class

 +Visualizer
    Handles Drawing the processes on DOM.
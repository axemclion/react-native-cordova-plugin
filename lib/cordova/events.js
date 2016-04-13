module.exports = function(context){
    var handlers = {};
    context.fireDocumentEvent = context.fireWindowEvent = function(event, data){
        if (Array.isArray(handlers[event])) {
            handlers[event].forEach(function(handler){
                setTimeout(function(){
                    handler(data);
                }, 0);
            });
        }
    };
    
    context.addEventListener = function(event, handler){
        if (typeof handlers[event] === 'undefined'){
            handlers[event] = [];
        }
        var id = handlers[event].length;
        handlers[event].push(handler);
        return {
            remove : function(){
                handlers[event].splice(id, 1);
            }
        }
    };
    
};
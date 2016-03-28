'use strict';

const { join: joinPaths } = require('path');
const load = (type, name) => require(joinPaths(__dirname, type, name));

module.exports = function(
  models, coreMethodNames, modelMethodNames, methodNameBuilder) {
    
  // load database methods
  const coreMethods = coreMethodNames.reduce(
    (methods, name) => {
      methods[name] = load('core', name);
      return methods;
    }, {}); 
  
  // create model-specific methods
  const modelMethods = modelMethodNames.reduce(
    (methods, methodName) => {
      
      models.forEach(model => {
        
        const { modelName } = model;
        const modelMethodName = methodNameBuilder(modelName, methodName);
        
        methods[modelMethodName] = load('model', methodName)(model, coreMethods);
      });
      return methods;
    }, {});
  
  return modelMethods;
}
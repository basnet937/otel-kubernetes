/*instrumentation.js*/
// Require dependencies
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const { OTLPTraceExporter } =  require('@opentelemetry/exporter-trace-otlp-grpc');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');


const sdk = new NodeSDK({
  // traceExporter: new ConsoleSpanExporter(),  // enables printing of traces on screen for debug
  traceExporter: new OTLPTraceExporter(), 
  
  instrumentations: [new HttpInstrumentation()]
});

sdk.start();
console.log('Tracing setup done.')

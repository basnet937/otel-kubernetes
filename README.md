# otel-kubernetes
Deploy otel-collector in kube cluster and send the traces to AWS xray 

# How does it work? 
## Send traces from app to collector
- Client application can instrument traces using existing SDKs
- Sample instrumentation script for nodejs is available in this repo [here](app/instrumentation.js)
- Documentation around how to instrument other languages can be found [here](https://opentelemetry.io/docs/instrumentation/)
- `kubectl apply -f kubernetes/webapp.yaml` deploys sample webapp (setup with tracing) to kubernetes cluster
- Environement variables `OTEL_EXPORTER_OTLP_ENDPOINT` and `OTEL_EXPORTER_OTLP_PROTOCOL` are used to configure the OTEL SDK instrumentation code. More about OTEL exporter env variables [here](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/protocol/exporter.md) 
## Send traces from collector to xray
- `kubectl apply -f kubernetes/otel.yaml` deploys otel-collector. 
- `collector-config` in config map is used to configure the otel-collector pod
- Notice that `aws-otel-collector:v0.35.0` docker image has been used for otel-collector to enable xray exporter in the otel-collector config file
- Remember to update `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` to authenticate with AWS xray
-   

# Links
https://opentelemetry.io/docs/collector/getting-started/
https://opentelemetry.io/docs/instrumentation/
https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/protocol/exporter.md

https://aws-otel.github.io/docs/getting-started/collector
https://github.com/aws-observability/aws-otel-collector/blob/main/docs/developers/docker-demo.md


https://www.aspecto.io/opentelemetry-fundamentals/opentelemetry-collector-on-kubernetes/
https://www.aspecto.io/blog/distributed-tracing-with-opentelemetry-collector-on-kubernetes/

# Commands 
## Docker 
```
version=1.02
docker build -t muzammil360/otel-kubernetes:${version} . \
&& docker push muzammil360/otel-kubernetes:${version}


# run docker if intested in testing
docker run --network=host --rm -e OTEL_EXPORTER_OTLP_ENDPOINT="http://$(minikube ip):32317" -e OTEL_EXPORTER_OTLP_PROTOCOL=grpc muzammil360/otel-kubernetes:${version} 

curl http://127.0.0.1:3000/ping # {"ping":"ping"} response shows docker is working

```


## Deploying kubernetes
After installing docker and minikube, run following 

```
cd kubernetes
minikube start 

kubectl apply -f webapp.yaml
kubectl apply -f otel.yaml

curl http://$(minikube ip):30100/ping # verify that app is up and running


kubectl get all # get all running resources 
kubectl get pods # get status of all pods

# read logs (make sure to update pod name)
kubectl logs -p pod/otel-collector-daemonset-s4gvp --previous=false -f 
kubectl logs -p pod/webapp-deployment-5fc5c9f59f-jjlql --previous=false -f 


# clean up
minikube delete --all
minikube stop

```


## misl useful commands
```
# send dummy test traces
docker run --network=host ghcr.io/open-telemetry/opentelemetry-collector-contrib/telemetrygen:latest traces --otlp-insecure --duration 1s --otlp-endpoint $(minikube ip):32317
```

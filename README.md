# otel-kubernetes

# How does it work? 


## Docker 
### build and run
```
version=1.01
docker build -t muzammil360/otel-kubernetes:${version} . \
&& docker push muzammil360/otel-kubernetes:${version}
 
docker run -p 3000:3000 -d muzammil360/otel-kubernetes:1.01

curl http://127.0.0.1:3000/ping # test that docker is working

```
### push
```
docker login -u muzammil360 --password-stdin
docker push muzammil360/otel-kubernetes:1.0
```


# Deploying kubernetes
After installing docker and minikube, run following 

```
cd kubernetes
minikube start 

kubectl apply -f webapp.yaml
kubectl apply -f otel.yaml

curl http://$(minikube ip):30100/ping # verify that app is up and running


```

### delete all resources
`minikube delete --all`
### stop the kubernetes
`minikube stop`

## misl useful commands
```
# send dummy test traces
docker run --network=host ghcr.io/open-telemetry/opentelemetry-collector-contrib/telemetrygen:latest traces --otlp-insecure --duration 1s --otlp-endpoint $(minikube ip):32317
```

### interact with cluster
```
kubectl apply -f webapp.yaml
kubectl apply -f otel.yaml

kubectl get all


kubectl logs -p pod/otel-collector-daemonset-s4gvp --previous=false
kubectl logs -p pod/webapp-deployment-5fc5c9f59f-jjlql --previous=false


```
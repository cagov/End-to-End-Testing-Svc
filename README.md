# End-to-End-Testing-Svc

Deployement target - https://fa-go-alph-e2e-001.azurewebsites.net

invoking via command line:

```
curl -X POST  https://api.github.com/repo/cagov/End-to-End-Testing-Svc/dispatches -H "Content-type: application/json" -d "{ 'event_type': 'on-demand-test', 'client_payload: {} }"
```
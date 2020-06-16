# End-to-End-Testing-Svc

Deployement target - https://fa-go-alph-e2e-001.azurewebsites.net

invoking via command line:

```
curl -X POST  https://api.github.com/repos/cagov/End-to-End-Testing-Svc/dispatches -H "Accept:  application/vnd.github.everest-preview+json" -H "Authorization: Bearer {{personalToken}}" -H "Content-type: application/json" -d '{ "event_type": "on-demand-test", "client_payload": {} }'
```
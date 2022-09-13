<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@microsoft/teamsfx](./teamsfx.md) &gt; [DefaultBotSsoExecutionActivityHandler](./teamsfx.defaultbotssoexecutionactivityhandler.md)

## DefaultBotSsoExecutionActivityHandler class

Default SSO execution activity handler

<b>Signature:</b>

```typescript
export declare class DefaultBotSsoExecutionActivityHandler extends TeamsActivityHandler implements BotSsoExecutionActivityHandler 
```
<b>Extends:</b> TeamsActivityHandler

<b>Implements:</b> [BotSsoExecutionActivityHandler](./teamsfx.botssoexecutionactivityhandler.md)

## Constructors

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [(constructor)(ssoConfig)](./teamsfx.defaultbotssoexecutionactivityhandler._constructor_.md) |  | Creates a new instance of the DefaultBotSsoExecutionActivityHandler. |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [addCommand(handler, triggerPatterns)](./teamsfx.defaultbotssoexecutionactivityhandler.addcommand.md) |  | Add TeamsFxBotSsoCommandHandler instance to SSO execution dialog |
|  [handleTeamsSigninTokenExchange(context, query)](./teamsfx.defaultbotssoexecutionactivityhandler.handleteamssignintokenexchange.md) |  | Receives invoke activities with Activity name of 'signin/tokenExchange' |
|  [handleTeamsSigninVerifyState(context, query)](./teamsfx.defaultbotssoexecutionactivityhandler.handleteamssigninverifystate.md) |  | Receives invoke activities with Activity name of 'signin/verifyState'. |
|  [run(context)](./teamsfx.defaultbotssoexecutionactivityhandler.run.md) |  | Called to initiate the event emission process. |

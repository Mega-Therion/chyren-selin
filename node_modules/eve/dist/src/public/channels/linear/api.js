import{isObject}from"#shared/guards.js";import{parseJsonObject}from"#shared/json.js";import{resolveLinearAccessToken}from"#public/channels/linear/auth.js";const AGENT_SESSION_FIELDS=`
  fragment AgentSessionFields on AgentSession {
    id
    appUser { id }
    comment { id }
    creator { id }
    issue { id identifier title url }
    sourceComment { id }
    status
    url
  }
`;var LinearApiError=class extends Error{body;queryName;status;constructor(e){super(`Linear GraphQL ${e.queryName} failed with HTTP ${e.status}.`),this.name=`LinearApiError`,this.body=e.body,this.queryName=e.queryName,this.status=e.status}};async function callLinearGraphQL(t){let r=t.api?.fetch??fetch,i=await resolveLinearAccessToken(t.credentials?.accessToken),a=await r(t.api?.apiBaseUrl??`https://api.linear.app/graphql`,{body:JSON.stringify({query:t.query,variables:t.variables??{}}),headers:{authorization:`Bearer ${i}`,"content-type":`application/json; charset=utf-8`},method:`POST`}),o=await parseResponseBody(a);if(!a.ok||hasGraphQLErrors(o)||!isObject(o)||!isObject(o.data))throw new LinearApiError({body:o,queryName:t.queryName,status:a.status});return o.data}async function createLinearAgentActivity(e){let n=(await callLinearGraphQL({api:e.api,credentials:e.credentials,query:`
      mutation AgentActivityCreate($input: AgentActivityCreateInput!) {
        agentActivityCreate(input: $input) {
          success
          agentActivity { id }
        }
      }
    `,queryName:`AgentActivityCreate`,variables:{input:parseJsonObject(e.activity)}})).agentActivityCreate,r=n?.agentActivity?.id;return{id:typeof r==`string`?r:``,success:n?.success===!0}}async function updateLinearAgentSession(e){return{success:(await callLinearGraphQL({api:e.api,credentials:e.credentials,query:`
      mutation AgentSessionUpdate($id: String!, $input: AgentSessionUpdateInput!) {
        agentSessionUpdate(id: $id, input: $input) {
          success
        }
      }
    `,queryName:`AgentSessionUpdate`,variables:{id:e.id,input:parseJsonObject(e.update)}})).agentSessionUpdate?.success===!0}}async function createLinearAgentSessionOnIssue(e){return normalizeAgentSessionRecord((await callLinearGraphQL({api:e.api,credentials:e.credentials,query:`
      mutation AgentSessionCreateOnIssue($input: AgentSessionCreateOnIssue!) {
        agentSessionCreateOnIssue(input: $input) {
          success
          agentSession {
            ...AgentSessionFields
          }
        }
      }
      ${AGENT_SESSION_FIELDS}
    `,queryName:`AgentSessionCreateOnIssue`,variables:{input:parseJsonObject({externalLink:e.externalLink,externalUrls:e.externalUrls,issueId:e.issueId})}})).agentSessionCreateOnIssue?.agentSession)}async function createLinearAgentSessionOnComment(e){return normalizeAgentSessionRecord((await callLinearGraphQL({api:e.api,credentials:e.credentials,query:`
      mutation AgentSessionCreateOnComment($input: AgentSessionCreateOnComment!) {
        agentSessionCreateOnComment(input: $input) {
          success
          agentSession {
            ...AgentSessionFields
          }
        }
      }
      ${AGENT_SESSION_FIELDS}
    `,queryName:`AgentSessionCreateOnComment`,variables:{input:parseJsonObject({commentId:e.commentId,externalLink:e.externalLink,externalUrls:e.externalUrls})}})).agentSessionCreateOnComment?.agentSession)}async function listLinearAgentSessionActivities(e){let t=(await callLinearGraphQL({api:e.api,credentials:e.credentials,query:`
      query AgentSessionActivities($id: String!, $last: Int!) {
        agentSession(id: $id) {
          activities(last: $last) {
            nodes {
              id
              signal
              signalMetadata
              updatedAt
              content {
                __typename
                ... on AgentActivityElicitationContent { body type }
                ... on AgentActivityPromptContent { body type }
                ... on AgentActivityResponseContent { body type }
                ... on AgentActivityThoughtContent { body type }
                ... on AgentActivityErrorContent { body type }
              }
            }
          }
        }
      }
    `,queryName:`AgentSessionActivities`,variables:{id:e.agentSessionId,last:e.last??20}})).agentSession?.activities?.nodes;return Array.isArray(t)?t.map(normalizeAgentActivityRecord).filter(notNull):[]}function normalizeAgentSessionRecord(t){if(!isObject(t)||typeof t.id!=`string`)throw Error(`linearChannel: Linear Agent Session response was malformed.`);let n=normalizeIssue(t.issue),r={id:t.id},i=relationId(t.appUser);typeof i==`string`&&(r.appUserId=i);let a=relationId(t.comment);a!==void 0&&(r.commentId=a);let o=relationId(t.creator);o!==void 0&&(r.creatorId=o),n!==void 0&&(r.issue=n);let s=relationId(t.issue);s!==void 0&&(r.issueId=s);let c=relationId(t.sourceComment);return c!==void 0&&(r.sourceCommentId=c),typeof t.status==`string`&&(r.status=t.status),(typeof t.url==`string`||t.url===null)&&(r.url=t.url),r}function relationId(t){if(t===null)return null;if(isObject(t)&&typeof t.id==`string`)return t.id}function normalizeAgentActivityRecord(n){if(!isObject(n)||typeof n.id!=`string`||!isObject(n.content))return null;let r={};typeof n.content.body==`string`&&(r.body=n.content.body),typeof n.content.type==`string`&&(r.type=n.content.type),typeof n.content.__typename==`string`&&(r.__typename=n.content.__typename);let i={content:r,id:n.id};return(typeof n.signal==`string`||n.signal===null)&&(i.signal=n.signal),isObject(n.signalMetadata)&&(i.signalMetadata=parseJsonObject(n.signalMetadata)),n.signalMetadata===null&&(i.signalMetadata=null),typeof n.updatedAt==`string`&&(i.updatedAt=n.updatedAt),i}function normalizeIssue(t){if(t===null)return null;if(!isObject(t)||typeof t.id!=`string`)return;let n={id:t.id};return typeof t.identifier==`string`&&(n.identifier=t.identifier),typeof t.title==`string`&&(n.title=t.title),typeof t.url==`string`&&(n.url=t.url),n}async function parseResponseBody(e){let t=await e.text();if(!t)return null;try{return JSON.parse(t)}catch{return t}}function hasGraphQLErrors(t){return isObject(t)&&Array.isArray(t.errors)&&t.errors.length>0}function notNull(e){return e!==null}export{LinearApiError,callLinearGraphQL,createLinearAgentActivity,createLinearAgentSessionOnComment,createLinearAgentSessionOnIssue,listLinearAgentSessionActivities,updateLinearAgentSession};
---
title: Index of Supported API Calls
---
The following sections help you locate the information you need.

See [API Calls by Name](#api-calls-by-name) if you know the call you want to make but you need further information about it.
See [API Calls by Topic](api-calls-by-topic) if you know what you want to do but you are not sure which call to use.

Both sections contain links to detailed information.

## API Calls by Name
Calls are listed in alphabetical order within each interface. Note that there is not a one-to-one correspondence between calls in the two interfaces because the HTTP interface has fewer calls. Juxtaposition of the HTTP calls with the JSON-RPC calls in the following table is not meant to imply correspondence.

### JSON-RPC Interface
| API Call | Details|
| --- | --- |
| abortMultipart|[Abort a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_json/#abort) |
|authenticate|[Log in to a Sub-directory](/delivery/storage/apis_api_calls/logging_in_using_the_json_rpc_interface/#log-in-to-a-subdirectory) |
| checkToken|[Determine Your Token's Age](/delivery/storage/apis_api_calls/working_with_sessions/#determine-token-age) |
| completeMultipart|[Complete a Multipart Upload](/delivery/storage/apis_api_calls/logging_in_using_the_json_rpc_interface/#complete) |
| deleteDir|[Delete a Directory](/delivery/storage/apis/api_calls/working_with_directories_json/#delete-directory) |
| deleteFile<br />|[Delete a File](/delivery/storage/apis/api_calls/working_with_files/#delete-a-file) |
| fetchFileHTTP|[Copy a File](/delivery/storage/apis/api_calls/working_with_files/#copy-a-file). |
| getMultipartStatus|[Get Status for a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_json/#get-status) |
| getMultipartStatusMap|[Get String Equivalents of Multipart Status Codes](/delivery/storage/apis/api_calls/working_with_multipart_json/#get-equivalent)  |
| initKeyPair|[Initializing HMAC Key Pairs](/delivery/storage/apis/api_calls/initializing_hmac_key_pairs) |
| listDir|[List Directories](/delivery/storage/apis/api_calls/working_with_directories_json/#list-directory) |
| listFile<br />|[List Files](/delivery/storage/apis/api_calls/working_with_files/#list-file) |
| listMultipart|[List Your Multipart Uploads](/delivery/storage/apis/api_calls/working_with_multipart_json/#list-pieces) |
| listMultipartPiece<br /><br />     See [List Pieces in a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_json/#list-multipart) |
| listPath<br />|[List Files and Directories](/delivery/storage/apis/api_calls/working_with_methods/#list) |
| login|[Log In](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface/#log-in) |
| logout|[Log Out](/delivery/storage/apis/api_calls/logging_out/#log-out) |
| makeDir|[Create a Directory](/delivery/storage/apis/api_calls/working_with_directories_json/#create-directory) |
| makeDir2|[Create a Directory Along With Leading Paths](/delivery/storage/apis/api_calls/working_with_directories_json/#leading-paths) |
| mediaVaultURL|[Generate a URL](/delivery/storage/apis/api_calls/working_with_files/#mediavault) |
| noop|[Perform an Authenticated Server Verification](/delivery/storage/apis/api_calls/verifying_the_server_api_connection/#pass-token) |
| ping<br />|[Perform an Unauthenticated Server Verification](/delivery/storage/apis/api_calls/verifying_the_server_api_connection/#no-pass-token) |
| rename<br />|[Rename a File or Directory](/delivery/storage/apis/api_calls/working_with_methods/#rename) |
| restartMultipart|[Restart a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_json/#restart) |
| setContentType|[Set a File's Content Type](/delivery/storage/apis/api_calls/working_with_files/#set-type) |
| setMTime|[Change a File or Directory Last Modification Time](/delivery/storage/apis/api_calls/working_with_methods/#change-time) |
| stat<br />[Obtain File or Directory Metadata](/delivery/storage/apis/api_calls/working_with_methods/#metadata) |
| updateSession|[Set Your Token's Expiry](/delivery/storage/apis/api_calls/working_with_sessions/#set-your-tokens-exiry) |


### HTTP Interface  {/*http-interface*/}
| API Call | Details |
| --- | --- |
| account/login|[Log In](/delivery/storage/apis/api_calls/logging_in_using_http_interface) |
|  multipart/complete|[Complete a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_http/#complete-multipart-upload) |
|multipart/create|[Begin a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_http/#begin-multipart-upload) |
|multipart-piece|[Create a Multipart Piece](/delivery/storage/apis/api_calls/working_with_multipart_http/#create-multipart-piece) |
|post/file|[Web Browser Upload](/delivery/storage/apis/api_calls/uploading_files/#web-browser-upload) |
|post/raw|[File Raw Post](/delivery/storage/apis/api_calls/uploading_files#file-raw-post) |

## API Calls by Topic  {/*api-calls-by-topic*/}
If you know what you want to do but you are not sure which call to use, refer to information in the following sections:

### Authentication  {/*authentication*/}
| Action  | API Call| Details|
| --- | --- | --- |
| Log in to Origin Storage| login<br /><br />/account/login (HTTP interface) | [Log In](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface/#log-in)<br /><br />[Log In](/delivery/storage/apis/api_calls/logging_in_using_http_interface) (HTTP interface) |
| Log into a specific sub-directory in Origin Storage| authenticate | [Log in to a Sub-directory](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface/#log-in-to-subdirectory) |
| Log out of Origin Storage| logout | [Logging Out](/delivery/storage/apis/api_calls/logging_out) |

### Connections and Tokens  {/*connections-and-tokens*/}
Calls are available in the JSON-RPC interface only.

| Action  | API Call| Details|
| --- | --- | --- |
| Determine your token's age | checkToken | [Determine Your Token's Age](/delivery/storage/apis_api_calls/working_with_sessions/#determine-token-age) |
| Set your token's expiry time | updateSession | [Set Your Token's Expiry](/delivery/storage/apis/api_calls/working_with_sessions/#set-your-tokens-exiry) |
| Verify the server API connection if you are logged in | noop | [Perform an Authenticated Server Verification](Verifying the Server API Connection.htm#Perform) |
| Verify the server API connection if you are not logged in | ping | [Perform an Unauthenticated Server Verification](Verifying the Server API Connection.htm#Perform2) |
| Generate a new key pair for use in signing requests | initKeyPair | [Initializing HMAC Key Pairs](Initializing HMAC Key Pairs.htm) |

### Directories  {/*directories*/}
### Files  {/*files*/}
### File Upload — Non-Multipart  {/*nonmultipart-download*/}
### File Upload — Multipart  {/*multipart-download*/}
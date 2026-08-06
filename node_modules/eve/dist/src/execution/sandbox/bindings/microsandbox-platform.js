import{access}from"node:fs/promises";import{existsSync}from"node:fs";import{WORKSPACE_ROOT}from"#runtime/workspace/types.js";import{MICROSANDBOX_USER}from"#execution/sandbox/bindings/microsandbox-options.js";function isMicrosandboxPlatformSupported(){return process.platform===`darwin`&&process.arch===`arm64`?!0:process.platform===`linux`&&(process.arch===`x64`||process.arch===`arm64`)&&isGlibcLinux()?process.env.MSB_PATH!==void 0||existsSync(`/dev/kvm`):!1}function isGlibcLinux(){try{return typeof(process.report?.getReport())?.header?.glibcVersionRuntime==`string`}catch{return!1}}async function assertMicrosandboxPlatformCandidate(){if(!(process.platform===`darwin`&&process.arch===`arm64`)){if(process.platform===`linux`&&(process.arch===`x64`||process.arch===`arm64`)){if(!isGlibcLinux())throw Error(`The microsandbox sandbox backend requires a glibc-based Linux distribution; musl hosts are not supported. Use docker() or vercel() instead.`);if(process.env.MSB_PATH!==void 0||await doesPathExist(`/dev/kvm`))return;throw Error("The microsandbox sandbox backend requires Linux with KVM enabled. `/dev/kvm` is not available on this host. Enable KVM, set MSB_PATH for a custom runtime, or use docker() / vercel().")}throw Error(`The microsandbox sandbox backend supports Linux with KVM or macOS on Apple Silicon. Current host is ${process.platform}/${process.arch}. Use docker() or vercel() on this host.`)}}async function doesPathExist(t){try{return await access(t),!0}catch{return!1}}async function ensureMicrosandboxBaseRuntime(e,t={}){let n=await collectMicrosandboxBaseRuntimeOutput(await e.execStreamWith(`bash`,e=>e.args([`-lc`,MICROSANDBOX_BASE_SETUP_SCRIPT]).cwd(`/`).user(`root`)),t.log);if(n.exitCode!==0)throw Error(`Failed to initialize the microsandbox base runtime. ${n.stderr||n.stdout}`.trim())}async function collectMicrosandboxBaseRuntimeOutput(e,t){let n=new TextDecoder,r=new TextDecoder,i=``,a=``,o=``,s=``,c;for await(let l of e)if(l.kind===`stdout`){let e=n.decode(l.data,{stream:!0});i=appendOutput(i,e),o=emitMicrosandboxBaseRuntimeLogs(o+e,t)}else if(l.kind===`stderr`){let e=r.decode(l.data,{stream:!0});a=appendOutput(a,e),s=emitMicrosandboxBaseRuntimeLogs(s+e,t)}else if(l.kind===`exited`){c=l.code;break}let l=n.decode(),u=r.decode();if(l.length>0&&(i=appendOutput(i,l),o=emitMicrosandboxBaseRuntimeLogs(o+l,t)),u.length>0&&(a=appendOutput(a,u),s=emitMicrosandboxBaseRuntimeLogs(s+u,t)),emitMicrosandboxBaseRuntimeLogLine(o,t),emitMicrosandboxBaseRuntimeLogLine(s,t),c===void 0)throw Error(`Microsandbox base runtime setup ended without an exit event.`);return{exitCode:c,stderr:a,stdout:i}}function emitMicrosandboxBaseRuntimeLogs(e,t){let n=e.split(/\r?\n/u),r=n.pop()??``;for(let e of n)emitMicrosandboxBaseRuntimeLogLine(e,t);return r}function emitMicrosandboxBaseRuntimeLogLine(e,t){let n=e.match(/^eve-base-runtime: ?(.*)$/u)?.[1];n!==void 0&&n.length>0&&t?.(n)}function appendOutput(e,t){let n=e+t;return n.length>2e4?n.slice(-2e4):n}const MICROSANDBOX_BASE_SETUP_SCRIPT=`
set -euo pipefail

log_step() {
  printf 'eve-base-runtime: %s\\n' "$*" >&2
}

log_step "checking bash"
command -v bash >/dev/null 2>&1

log_step "checking sandbox user"
if ! id -u ${MICROSANDBOX_USER} >/dev/null 2>&1; then
  command -v useradd >/dev/null 2>&1
  log_step "create sandbox user: ${MICROSANDBOX_USER}"
  useradd -m -s /bin/bash ${MICROSANDBOX_USER}
fi

log_step "prepare workspace directory: ${WORKSPACE_ROOT}"
mkdir -p ${WORKSPACE_ROOT}
chown ${MICROSANDBOX_USER}:${MICROSANDBOX_USER} ${WORKSPACE_ROOT}
`;export{assertMicrosandboxPlatformCandidate,ensureMicrosandboxBaseRuntime,isMicrosandboxPlatformSupported};
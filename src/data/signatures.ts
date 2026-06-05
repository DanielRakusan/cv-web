// Statická data — všechny varianty podpisu (frontend nezávislý na backendu)
export interface SignatureVariant {
  id: number;
  name: string;
  theme: "light" | "dark";
  description: string;
  html: string;
}

export const signatures: SignatureVariant[] = [
  { id: 1, name: "Modern Card", theme: "light", description: "Zelen\u00fd accent vlevo, 2\u00d72 linky", html: `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:500px;width:100%;background:#fff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;">
        <tr>
          <!-- Zelený accent vlevo -->
          <td style="width:4px;background:linear-gradient(to bottom,#22c55e,#86efac);font-size:0;">&zwnj;</td>
          <td style="padding:20px 20px 0 20px;">
            <!-- Header: foto + info -->
            <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
              <tr>
                <td style="padding-right:18px;vertical-align:middle;">
                  <table cellpadding="0" cellspacing="0" border="0"><tr>
                    <td width="100" height="100" style="background:linear-gradient(135deg,#22c55e,#86efac);border-radius:50px;padding:3px;width:100px;height:100px;">
                      <img src="https://github.com/DanielRakusan.png" width="94" height="94" style="border-radius:47px;display:block;border:3px solid #fff;" alt="Daniel Rakušan">
                    </td>
                  </tr></table>
                </td>
                <td style="vertical-align:middle;">
                  <div style="color:#111827;font-size:24px;font-weight:700;margin:0 0 4px;line-height:1.2;">Daniel Rakušan</div>
                  <div style="color:#16a34a;font-size:14px;font-weight:600;margin-bottom:8px;">Junior Python Backend Developer</div>
                  <div style="font-size:12px;color:#6b7280;">
                    <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#22c55e;vertical-align:middle;margin-right:5px;animation:pulse-dot 2s ease-in-out infinite;"></span>
                    Praha / Remote
                  </div>
                </td>
              </tr>
            </table>
            <!-- Linky 2×2 -->
            <div style="height:1px;background:#f1f5f9;margin-bottom:12px;"></div>
            <table cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:14px;">
              <tr>
                <td style="padding-bottom:8px;width:50%;">
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMjEuNzUgNi43NXYxMC41YTIuMjUgMi4yNSAwIDAxLTIuMjUgMi4yNWgtMTVhMi4yNSAyLjI1IDAgMDEtMi4yNS0yLjI1VjYuNzVtMTkuNSAwQTIuMjUgMi4yNSAwIDAwMTkuNSA0LjVoLTE1YTIuMjUgMi4yNSAwIDAwLTIuMjUgMi4yNW0xOS41IDB2LjI0M2EyLjI1IDIuMjUgMCAwMS0xLjA3IDEuOTE2bC03LjUgNC42MTVhMi4yNSAyLjI1IDAgMDEtMi4zNiAwTDMuMzIgOC45MWEyLjI1IDIuMjUgMCAwMS0xLjA3LTEuOTE2VjYuNzUiIHN0cm9rZT0icmdiKDIyLDE2Myw3NCkiLz48L3N2Zz4=" width="15" height="15" style="vertical-align:middle;margin-right:7px;" alt="">
                  <a href="mailto:rakusan.dev@gmail.com" style="color:#374151;text-decoration:none;font-size:12px;vertical-align:middle;">rakusan.dev@gmail.com</a>
                </td>
                <td style="padding-bottom:8px;">
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMTIgMjFhOS4wMDQgOS4wMDQgMCAwMDguNzE2LTYuNzQ3TTEyIDIxYTkuMDA0IDkuMDA0IDAgMDEtOC43MTYtNi43NDdNMTIgMjFjMi40ODUgMCA0LjUtNC4wMyA0LjUtOVMxNC40ODUgMyAxMiAzbTAgMThjLTIuNDg1IDAtNC41LTQuMDMtNC41LTlTOS41MTUgMyAxMiAzbTAgMGE4Ljk5NyA4Ljk5NyAwIDAxNy44NDMgNC41ODJNMTIgM2E4Ljk5NyA4Ljk5NyAwIDAwLTcuODQzIDQuNTgybTE1LjY4NiAwQTExLjk1MyAxMS45NTMgMCAwMTEyIDEwLjVjLTIuOTk4IDAtNS43NC0xLjEtNy44NDMtMi45MThtMTUuNjg2IDBBOC45NTkgOC45NTkgMCAwMTIxIDEyYzAgLjc3OC0uMDk5IDEuNTMzLS4yODQgMi4yNTNtMCAwQTE3LjkxOSAxNy45MTkgMCAwMTEyIDE2LjVjLTMuMTYyIDAtNi4xMzMtLjgxNS04LjcxNi0yLjI0N20wIDBBOS4wMTUgOS4wMTUgMCAwMTMgMTJjMC0xLjYwNS40Mi0zLjExMyAxLjE1Ny00LjQxOCIgc3Ryb2tlPSJyZ2IoMjIsMTYzLDc0KSIvPjwvc3ZnPg==" width="15" height="15" style="vertical-align:middle;margin-right:7px;" alt="">
                  <a href="https://danielrakusan.cz" style="color:#374151;text-decoration:none;font-size:12px;vertical-align:middle;">danielrakusan.cz</a>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0icmdiKDM2LDQxLDQ2KSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMEM1LjM3IDAgMCA1LjM3IDAgMTJjMCA1LjMxIDMuNDM1IDkuNzk1IDguMjA1IDExLjM4NS42LjEwNS44MjUtLjI1NS44MjUtLjU3IDAtLjI4NS0uMDE1LTEuMjMtLjAxNS0yLjIzNS0zLjAxNS41NTUtMy43OTUtLjczNS00LjAzNS0xLjQxLS4xMzUtLjM0NS0uNzItMS40MS0xLjIzLTEuNjk1LS40Mi0uMjI1LTEuMDItLjc4LS4wMTUtLjc5NS45NDUtLjAxNSAxLjYyLjg3IDEuODQ1IDEuMjMgMS4wOCAxLjgxNSAyLjgwNSAxLjMwNSAzLjQ5NS45OS4xMDUtLjc4LjQyLTEuMzA1Ljc2NS0xLjYwNS0yLjY3LS4zLTUuNDYtMS4zMzUtNS40Ni01LjkyNSAwLTEuMzA1LjQ2NS0yLjM4NSAxLjIzLTMuMjI1LS4xMi0uMy0uNTQtMS41My4xMi0zLjE4IDAgMCAxLjAwNS0uMzE1IDMuMyAxLjIzLjk2LS4yNyAxLjk4LS40MDUgMy0uNDA1czIuMDQuMTM1IDMgLjQwNWMyLjI5NS0xLjU2IDMuMy0xLjIzIDMuMy0xLjIzLjY2IDEuNjUuMjQgMi44OC4xMiAzLjE4Ljc2NS44NCAxLjIzIDEuOTA1IDEuMjMgMy4yMjUgMCA0LjYwNS0yLjgwNSA1LjYyNS01LjQ3NSA1LjkyNS40MzUuMzc1LjgxIDEuMDk1LjgxIDIuMjIgMCAxLjYwNS0uMDE1IDIuODk1LS4wMTUgMy4zIDAgLjMxNS4yMjUuNjkuODI1LjU3QTEyLjAyIDEyLjAyIDAgMDAyNCAxMmMwLTYuNjMtNS4zNy0xMi0xMi0xMnoiLz48L3N2Zz4=" width="15" height="15" style="vertical-align:middle;margin-right:7px;" alt="">
                  <a href="https://github.com/DanielRakusan" style="color:#374151;text-decoration:none;font-size:12px;vertical-align:middle;">github.com/DanielRakusan</a>
                </td>
                <td>
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0icmdiKDAsMTE5LDE4MSkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIwLjQ0NyAyMC40NTJoLTMuNTU0di01LjU2OWMwLTEuMzI4LS4wMjctMy4wMzctMS44NTItMy4wMzctMS44NTMgMC0yLjEzNiAxLjQ0NS0yLjEzNiAyLjkzOXY1LjY2N0g5LjM1MVY5aDMuNDE0djEuNTYxaC4wNDZjLjQ3Ny0uOSAxLjYzNy0xLjg1IDMuMzctMS44NSAzLjYwMSAwIDQuMjY3IDIuMzcgNC4yNjcgNS40NTV2Ni4yODZ6TTUuMzM3IDcuNDMzYTIuMDYyIDIuMDYyIDAgMDEtMi4wNjMtMi4wNjUgMi4wNjQgMi4wNjQgMCAxMTIuMDYzIDIuMDY1em0xLjc4MiAxMy4wMTlIMy41NTVWOWgzLjU2NHYxMS40NTJ6TTIyLjIyNSAwSDEuNzcxQy43OTIgMCAwIC43NzQgMCAxLjcyOXYyMC41NDJDMCAyMy4yMjcuNzkyIDI0IDEuNzcxIDI0aDIwLjQ1MUMyMy4yIDI0IDI0IDIzLjIyNyAyNCAyMi4yNzFWMS43MjlDMjQgLjc3NCAyMy4yIDAgMjIuMjIyIDBoLjAwM3oiLz48L3N2Zz4=" width="15" height="15" style="vertical-align:middle;margin-right:7px;" alt="">
                  <a href="https://linkedin.com/in/daniel-rakusan" style="color:#374151;text-decoration:none;font-size:12px;vertical-align:middle;">linkedin.com/in/daniel-rakusan</a>
                </td>
              </tr>
            </table>
            <!-- Info box -->
            <table cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;margin-bottom:16px;">
              <tr>
                <td style="padding:12px 16px;vertical-align:middle;width:42px;"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTUuNTkgMTQuMzdhNiA2IDAgMDEtNS44NCA3LjM4di00LjhtNS44NC0yLjU4YTE0Ljk4IDE0Ljk4IDAgMDA2LjE2LTEyLjEyQTE0Ljk4IDE0Ljk4IDAgMDA5LjYzMSA4LjQxbTUuOTYgNS45NmExNC45MjYgMTQuOTI2IDAgMDEtNS44NDEgMi41OG0tLjExOS04LjU0YTYgNiAwIDAwLTcuMzgxIDUuODRoNC44bTIuNTgxLTUuODRhMTQuOTI3IDE0LjkyNyAwIDAwLTIuNTggNS44NG0yLjY5OSAyLjdjLS4xMDMuMDIxLS4yMDcuMDQxLS4zMTEuMDZhMTUuMDkgMTUuMDkgMCAwMS0yLjQ0OC0yLjQ0OCAxNC45IDE0LjkgMCAwMS4wNi0uMzEybS0yLjI0IDIuMzlhNC40OTMgNC40OTMgMCAwMC0xLjc1NyA0LjMwNiA0LjQ5MyA0LjQ5MyAwIDAwNC4zMDYtMS43NThNMTYuNSA5YTEuNSAxLjUgMCAxMS0zIDAgMS41IDEuNSAwIDAxMyAweiIgc3Ryb2tlPSJyZ2IoMjIsMTYzLDc0KSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==" width="26" height="26" style="vertical-align:middle;display:block;" alt=""></td>
                <td style="padding:12px 0;vertical-align:middle;">
                  <div style="font-size:13px;font-weight:700;color:#111827;margin-bottom:3px;">Portfolio &amp; Projects</div>
                  <div style="font-size:12px;color:#6b7280;">Explore my work, projects and journey</div>
                </td>
                <td style="padding:12px 16px;vertical-align:middle;text-align:right;white-space:nowrap;">
                  <a href="https://danielrakusan.cz" style="color:#16a34a;text-decoration:none;font-size:12px;font-weight:600;">danielrakusan.cz ↗</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>` },
  { id: 2, name: "Clean Minimal", theme: "light", description: "Vertik\u00e1ln\u00ed linka, nejuniverz\u00e1ln\u011bj\u0161\u00ed", html: `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:500px;width:100%;background:#fff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;padding:20px;">
        <tr><td style="padding:20px;">
          <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
            <tr>
              <td style="padding-right:14px;vertical-align:middle;">
                <table cellpadding="0" cellspacing="0" border="0"><tr>
                  <td width="100" height="100" style="background:linear-gradient(135deg,#22c55e,#86efac);border-radius:50px;padding:3px;width:100px;height:100px;">
                    <img src="https://github.com/DanielRakusan.png" width="94" height="94" style="border-radius:47px;display:block;border:3px solid #fff;" alt="Daniel Rakušan">
                  </td>
                </tr></table>
              </td>
              <td style="width:3px;background:linear-gradient(to bottom,#22c55e,#86efac);border-radius:2px;font-size:0;">&zwnj;</td>
              <td style="padding-left:16px;vertical-align:middle;">
                <div style="color:#111827;font-size:24px;font-weight:700;margin:0 0 4px;">Daniel Rakušan</div>
                <div style="color:#16a34a;font-size:14px;font-weight:600;margin-bottom:8px;">Junior Python Backend Developer</div>
                <div style="font-size:12px;color:#6b7280;">
                  <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#22c55e;vertical-align:middle;margin-right:5px;animation:pulse-dot 2s ease-in-out infinite;"></span>
                  Praha / Remote
                </div>
              </td>
            </tr>
          </table>
          <div style="height:1px;background:#f1f5f9;margin-bottom:12px;"></div>
          <table cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:14px;">
            <tr>
              <td style="padding-bottom:8px;width:50%;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMjEuNzUgNi43NXYxMC41YTIuMjUgMi4yNSAwIDAxLTIuMjUgMi4yNWgtMTVhMi4yNSAyLjI1IDAgMDEtMi4yNS0yLjI1VjYuNzVtMTkuNSAwQTIuMjUgMi4yNSAwIDAwMTkuNSA0LjVoLTE1YTIuMjUgMi4yNSAwIDAwLTIuMjUgMi4yNW0xOS41IDB2LjI0M2EyLjI1IDIuMjUgMCAwMS0xLjA3IDEuOTE2bC03LjUgNC42MTVhMi4yNSAyLjI1IDAgMDEtMi4zNiAwTDMuMzIgOC45MWEyLjI1IDIuMjUgMCAwMS0xLjA3LTEuOTE2VjYuNzUiIHN0cm9rZT0icmdiKDIyLDE2Myw3NCkiLz48L3N2Zz4=" width="15" height="15" style="vertical-align:middle;margin-right:7px;" alt="">
                <a href="mailto:rakusan.dev@gmail.com" style="color:#374151;text-decoration:none;font-size:12px;">rakusan.dev@gmail.com</a>
              </td>
              <td style="padding-bottom:8px;padding-left:12px;border-left:1px solid #e2e8f0;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMTIgMjFhOS4wMDQgOS4wMDQgMCAwMDguNzE2LTYuNzQ3TTEyIDIxYTkuMDA0IDkuMDA0IDAgMDEtOC43MTYtNi43NDdNMTIgMjFjMi40ODUgMCA0LjUtNC4wMyA0LjUtOVMxNC40ODUgMyAxMiAzbTAgMThjLTIuNDg1IDAtNC41LTQuMDMtNC41LTlTOS41MTUgMyAxMiAzbTAgMGE4Ljk5NyA4Ljk5NyAwIDAxNy44NDMgNC41ODJNMTIgM2E4Ljk5NyA4Ljk5NyAwIDAwLTcuODQzIDQuNTgybTE1LjY4NiAwQTExLjk1MyAxMS45NTMgMCAwMTEyIDEwLjVjLTIuOTk4IDAtNS43NC0xLjEtNy44NDMtMi45MThtMTUuNjg2IDBBOC45NTkgOC45NTkgMCAwMTIxIDEyYzAgLjc3OC0uMDk5IDEuNTMzLS4yODQgMi4yNTNtMCAwQTE3LjkxOSAxNy45MTkgMCAwMTEyIDE2LjVjLTMuMTYyIDAtNi4xMzMtLjgxNS04LjcxNi0yLjI0N20wIDBBOS4wMTUgOS4wMTUgMCAwMTMgMTJjMC0xLjYwNS40Mi0zLjExMyAxLjE1Ny00LjQxOCIgc3Ryb2tlPSJyZ2IoMjIsMTYzLDc0KSIvPjwvc3ZnPg==" width="15" height="15" style="vertical-align:middle;margin-right:7px;" alt="">
                <a href="https://danielrakusan.cz" style="color:#374151;text-decoration:none;font-size:12px;">danielrakusan.cz</a>
              </td>
            </tr>
            <tr>
              <td>
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0icmdiKDM2LDQxLDQ2KSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMEM1LjM3IDAgMCA1LjM3IDAgMTJjMCA1LjMxIDMuNDM1IDkuNzk1IDguMjA1IDExLjM4NS42LjEwNS44MjUtLjI1NS44MjUtLjU3IDAtLjI4NS0uMDE1LTEuMjMtLjAxNS0yLjIzNS0zLjAxNS41NTUtMy43OTUtLjczNS00LjAzNS0xLjQxLS4xMzUtLjM0NS0uNzItMS40MS0xLjIzLTEuNjk1LS40Mi0uMjI1LTEuMDItLjc4LS4wMTUtLjc5NS45NDUtLjAxNSAxLjYyLjg3IDEuODQ1IDEuMjMgMS4wOCAxLjgxNSAyLjgwNSAxLjMwNSAzLjQ5NS45OS4xMDUtLjc4LjQyLTEuMzA1Ljc2NS0xLjYwNS0yLjY3LS4zLTUuNDYtMS4zMzUtNS40Ni01LjkyNSAwLTEuMzA1LjQ2NS0yLjM4NSAxLjIzLTMuMjI1LS4xMi0uMy0uNTQtMS41My4xMi0zLjE4IDAgMCAxLjAwNS0uMzE1IDMuMyAxLjIzLjk2LS4yNyAxLjk4LS40MDUgMy0uNDA1czIuMDQuMTM1IDMgLjQwNWMyLjI5NS0xLjU2IDMuMy0xLjIzIDMuMy0xLjIzLjY2IDEuNjUuMjQgMi44OC4xMiAzLjE4Ljc2NS44NCAxLjIzIDEuOTA1IDEuMjMgMy4yMjUgMCA0LjYwNS0yLjgwNSA1LjYyNS01LjQ3NSA1LjkyNS40MzUuMzc1LjgxIDEuMDk1LjgxIDIuMjIgMCAxLjYwNS0uMDE1IDIuODk1LS4wMTUgMy4zIDAgLjMxNS4yMjUuNjkuODI1LjU3QTEyLjAyIDEyLjAyIDAgMDAyNCAxMmMwLTYuNjMtNS4zNy0xMi0xMi0xMnoiLz48L3N2Zz4=" width="15" height="15" style="vertical-align:middle;margin-right:7px;" alt="">
                <a href="https://github.com/DanielRakusan" style="color:#374151;text-decoration:none;font-size:12px;">github.com/DanielRakusan</a>
              </td>
              <td style="padding-left:12px;border-left:1px solid #e2e8f0;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0icmdiKDAsMTE5LDE4MSkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIwLjQ0NyAyMC40NTJoLTMuNTU0di01LjU2OWMwLTEuMzI4LS4wMjctMy4wMzctMS44NTItMy4wMzctMS44NTMgMC0yLjEzNiAxLjQ0NS0yLjEzNiAyLjkzOXY1LjY2N0g5LjM1MVY5aDMuNDE0djEuNTYxaC4wNDZjLjQ3Ny0uOSAxLjYzNy0xLjg1IDMuMzctMS44NSAzLjYwMSAwIDQuMjY3IDIuMzcgNC4yNjcgNS40NTV2Ni4yODZ6TTUuMzM3IDcuNDMzYTIuMDYyIDIuMDYyIDAgMDEtMi4wNjMtMi4wNjUgMi4wNjQgMi4wNjQgMCAxMTIuMDYzIDIuMDY1em0xLjc4MiAxMy4wMTlIMy41NTVWOWgzLjU2NHYxMS40NTJ6TTIyLjIyNSAwSDEuNzcxQy43OTIgMCAwIC43NzQgMCAxLjcyOXYyMC41NDJDMCAyMy4yMjcuNzkyIDI0IDEuNzcxIDI0aDIwLjQ1MUMyMy4yIDI0IDI0IDIzLjIyNyAyNCAyMi4yNzFWMS43MjlDMjQgLjc3NCAyMy4yIDAgMjIuMjIyIDBoLjAwM3oiLz48L3N2Zz4=" width="15" height="15" style="vertical-align:middle;margin-right:7px;" alt="">
                <a href="https://linkedin.com/in/daniel-rakusan" style="color:#374151;text-decoration:none;font-size:12px;">linkedin.com/in/daniel-rakusan</a>
              </td>
            </tr>
          </table>
          <!-- Info box -->
          <table cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;">
            <tr>
              <td style="padding:12px 16px;vertical-align:middle;width:42px;"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE0LjQ0NyAzLjAyNmEuNzUuNzUgMCAwMS41MjcuOTIxbC00LjUgMTYuNWEuNzUuNzUgMCAwMS0xLjQ0OC0uMzk0bDQuNS0xNi41YS43NS43NSAwIDAxLjkyMS0uNTI3ek0xNi43MiA2LjIyYS43NS43NSAwIDAxMS4wNiAwbDUuMjUgNS4yNWEuNzUuNzUgMCAwMTAgMS4wNmwtNS4yNSA1LjI1YS43NS43NSAwIDExLTEuMDYtMS4wNkwyMS40NCAxMmwtNC43Mi00LjcyYS43NS43NSAwIDAxMC0xLjA2em0tOS40NCAwYS43NS43NSAwIDAxMCAxLjA2TDIuNTYgMTJsNC43MiA0LjcyYS43NS43NSAwIDExLTEuMDYgMS4wNkwuOTcgMTIuNTNhLjc1Ljc1IDAgMDEwLTEuMDZsNS4yNS01LjI1YS43NS43NSAwIDAxMS4wNiAweiIgZmlsbD0icmdiKDIyLDE2Myw3NCkiLz48L3N2Zz4=" width="26" height="26" style="vertical-align:middle;display:block;" alt=""></td>
              <td style="padding:12px 0;vertical-align:middle;">
                <div style="font-size:13px;font-weight:700;color:#111827;margin-bottom:3px;">Python &bull; AI &bull; Automation &bull; Problem Solving</div>
                <div style="font-size:12px;color:#6b7280;">Building practical solutions and learning in public.</div>
              </td>
              <td style="padding:12px 16px;vertical-align:middle;text-align:right;white-space:nowrap;">
                <a href="https://danielrakusan.cz" style="color:#16a34a;text-decoration:none;font-size:12px;font-weight:600;">danielrakusan.cz ↗</a>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>` },
  { id: 3, name: "Compact", theme: "light", description: "Linky na jednom \u0159\u00e1dku, nejkrat\u0161\u00ed", html: `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:500px;width:100%;background:#fff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;">
        <tr>
          <td style="width:4px;background:linear-gradient(to bottom,#22c55e,#86efac);font-size:0;">&zwnj;</td>
          <td style="padding:20px;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
              <tr>
                <td style="padding-right:16px;vertical-align:middle;">
                  <table cellpadding="0" cellspacing="0" border="0"><tr>
                    <td width="96" height="96" style="background:linear-gradient(135deg,#22c55e,#86efac);border-radius:48px;padding:3px;width:96px;height:96px;">
                      <img src="https://github.com/DanielRakusan.png" width="90" height="90" style="border-radius:45px;display:block;border:3px solid #fff;" alt="Daniel Rakušan">
                    </td>
                  </tr></table>
                </td>
                <td style="vertical-align:middle;">
                  <div style="color:#111827;font-size:22px;font-weight:700;margin:0 0 4px;">Daniel Rakušan</div>
                  <div style="color:#16a34a;font-size:13px;font-weight:600;margin-bottom:7px;">Junior Python Backend Developer</div>
                  <div style="font-size:12px;color:#6b7280;">
                    <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#22c55e;vertical-align:middle;margin-right:5px;animation:pulse-dot 2s ease-in-out infinite;"></span>
                    Praha / Remote
                  </div>
                </td>
              </tr>
            </table>
            <div style="height:1px;background:#f1f5f9;margin-bottom:10px;"></div>
            <!-- Linky na jednom řádku -->
            <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
              <tr>
                <td style="padding-right:14px;">
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMjEuNzUgNi43NXYxMC41YTIuMjUgMi4yNSAwIDAxLTIuMjUgMi4yNWgtMTVhMi4yNSAyLjI1IDAgMDEtMi4yNS0yLjI1VjYuNzVtMTkuNSAwQTIuMjUgMi4yNSAwIDAwMTkuNSA0LjVoLTE1YTIuMjUgMi4yNSAwIDAwLTIuMjUgMi4yNW0xOS41IDB2LjI0M2EyLjI1IDIuMjUgMCAwMS0xLjA3IDEuOTE2bC03LjUgNC42MTVhMi4yNSAyLjI1IDAgMDEtMi4zNiAwTDMuMzIgOC45MWEyLjI1IDIuMjUgMCAwMS0xLjA3LTEuOTE2VjYuNzUiIHN0cm9rZT0icmdiKDIyLDE2Myw3NCkiLz48L3N2Zz4=" width="14" height="14" style="vertical-align:middle;margin-right:5px;" alt="">
                  <a href="mailto:rakusan.dev@gmail.com" style="color:#374151;text-decoration:none;font-size:11px;vertical-align:middle;">rakusan.dev@gmail.com</a>
                </td>
                <td style="padding-right:14px;border-left:1px solid #e2e8f0;padding-left:12px;">
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMTIgMjFhOS4wMDQgOS4wMDQgMCAwMDguNzE2LTYuNzQ3TTEyIDIxYTkuMDA0IDkuMDA0IDAgMDEtOC43MTYtNi43NDdNMTIgMjFjMi40ODUgMCA0LjUtNC4wMyA0LjUtOVMxNC40ODUgMyAxMiAzbTAgMThjLTIuNDg1IDAtNC41LTQuMDMtNC41LTlTOS41MTUgMyAxMiAzbTAgMGE4Ljk5NyA4Ljk5NyAwIDAxNy44NDMgNC41ODJNMTIgM2E4Ljk5NyA4Ljk5NyAwIDAwLTcuODQzIDQuNTgybTE1LjY4NiAwQTExLjk1MyAxMS45NTMgMCAwMTEyIDEwLjVjLTIuOTk4IDAtNS43NC0xLjEtNy44NDMtMi45MThtMTUuNjg2IDBBOC45NTkgOC45NTkgMCAwMTIxIDEyYzAgLjc3OC0uMDk5IDEuNTMzLS4yODQgMi4yNTNtMCAwQTE3LjkxOSAxNy45MTkgMCAwMTEyIDE2LjVjLTMuMTYyIDAtNi4xMzMtLjgxNS04LjcxNi0yLjI0N20wIDBBOS4wMTUgOS4wMTUgMCAwMTMgMTJjMC0xLjYwNS40Mi0zLjExMyAxLjE1Ny00LjQxOCIgc3Ryb2tlPSJyZ2IoMjIsMTYzLDc0KSIvPjwvc3ZnPg==" width="14" height="14" style="vertical-align:middle;margin-right:5px;" alt="">
                  <a href="https://danielrakusan.cz" style="color:#374151;text-decoration:none;font-size:11px;vertical-align:middle;">danielrakusan.cz</a>
                </td>
                <td style="border-left:1px solid #e2e8f0;padding-left:12px;padding-right:14px;">
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0icmdiKDM2LDQxLDQ2KSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMEM1LjM3IDAgMCA1LjM3IDAgMTJjMCA1LjMxIDMuNDM1IDkuNzk1IDguMjA1IDExLjM4NS42LjEwNS44MjUtLjI1NS44MjUtLjU3IDAtLjI4NS0uMDE1LTEuMjMtLjAxNS0yLjIzNS0zLjAxNS41NTUtMy43OTUtLjczNS00LjAzNS0xLjQxLS4xMzUtLjM0NS0uNzItMS40MS0xLjIzLTEuNjk1LS40Mi0uMjI1LTEuMDItLjc4LS4wMTUtLjc5NS45NDUtLjAxNSAxLjYyLjg3IDEuODQ1IDEuMjMgMS4wOCAxLjgxNSAyLjgwNSAxLjMwNSAzLjQ5NS45OS4xMDUtLjc4LjQyLTEuMzA1Ljc2NS0xLjYwNS0yLjY3LS4zLTUuNDYtMS4zMzUtNS40Ni01LjkyNSAwLTEuMzA1LjQ2NS0yLjM4NSAxLjIzLTMuMjI1LS4xMi0uMy0uNTQtMS41My4xMi0zLjE4IDAgMCAxLjAwNS0uMzE1IDMuMyAxLjIzLjk2LS4yNyAxLjk4LS40MDUgMy0uNDA1czIuMDQuMTM1IDMgLjQwNWMyLjI5NS0xLjU2IDMuMy0xLjIzIDMuMy0xLjIzLjY2IDEuNjUuMjQgMi44OC4xMiAzLjE4Ljc2NS44NCAxLjIzIDEuOTA1IDEuMjMgMy4yMjUgMCA0LjYwNS0yLjgwNSA1LjYyNS01LjQ3NSA1LjkyNS40MzUuMzc1LjgxIDEuMDk1LjgxIDIuMjIgMCAxLjYwNS0uMDE1IDIuODk1LS4wMTUgMy4zIDAgLjMxNS4yMjUuNjkuODI1LjU3QTEyLjAyIDEyLjAyIDAgMDAyNCAxMmMwLTYuNjMtNS4zNy0xMi0xMi0xMnoiLz48L3N2Zz4=" width="14" height="14" style="vertical-align:middle;margin-right:5px;" alt="">
                  <a href="https://github.com/DanielRakusan" style="color:#374151;text-decoration:none;font-size:11px;vertical-align:middle;">GitHub</a>
                </td>
                <td style="border-left:1px solid #e2e8f0;padding-left:12px;">
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0icmdiKDAsMTE5LDE4MSkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIwLjQ0NyAyMC40NTJoLTMuNTU0di01LjU2OWMwLTEuMzI4LS4wMjctMy4wMzctMS44NTItMy4wMzctMS44NTMgMC0yLjEzNiAxLjQ0NS0yLjEzNiAyLjkzOXY1LjY2N0g5LjM1MVY5aDMuNDE0djEuNTYxaC4wNDZjLjQ3Ny0uOSAxLjYzNy0xLjg1IDMuMzctMS44NSAzLjYwMSAwIDQuMjY3IDIuMzcgNC4yNjcgNS40NTV2Ni4yODZ6TTUuMzM3IDcuNDMzYTIuMDYyIDIuMDYyIDAgMDEtMi4wNjMtMi4wNjUgMi4wNjQgMi4wNjQgMCAxMTIuMDYzIDIuMDY1em0xLjc4MiAxMy4wMTlIMy41NTVWOWgzLjU2NHYxMS40NTJ6TTIyLjIyNSAwSDEuNzcxQy43OTIgMCAwIC43NzQgMCAxLjcyOXYyMC41NDJDMCAyMy4yMjcuNzkyIDI0IDEuNzcxIDI0aDIwLjQ1MUMyMy4yIDI0IDI0IDIzLjIyNyAyNCAyMi4yNzFWMS43MjlDMjQgLjc3NCAyMy4yIDAgMjIuMjIyIDBoLjAwM3oiLz48L3N2Zz4=" width="14" height="14" style="vertical-align:middle;margin-right:5px;" alt="">
                  <a href="https://linkedin.com/in/daniel-rakusan" style="color:#374151;text-decoration:none;font-size:11px;vertical-align:middle;">LinkedIn</a>
                </td>
              </tr>
            </table>
            <!-- Info box -->
            <table cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;">
              <tr>
                <td style="padding:12px 14px;vertical-align:middle;width:40px;"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNNi43NSA3LjVsMyAyLjI1LTMgMi4yNW00LjUgMGgzbS05IDguMjVoMTMuNUEyLjI1IDIuMjUgMCAwMDIxIDE4VjZhMi4yNSAyLjI1IDAgMDAtMi4yNS0yLjI1SDUuMjVBMi4yNSAyLjI1IDAgMDAzIDZ2MTJhMi4yNSAyLjI1IDAgMDAyLjI1IDIuMjV6IiBzdHJva2U9InJnYigyMiwxNjMsNzQpIi8+PC9zdmc+" width="26" height="26" style="vertical-align:middle;display:block;" alt=""></td>
                <td style="padding:11px 0;vertical-align:middle;">
                  <div style="font-size:13px;font-weight:700;color:#111827;margin-bottom:3px;">Turning ideas into working software.</div>
                  <div style="font-size:12px;color:#6b7280;">Focused on Python, AI and clean backend solutions.</div>
                </td>
                <td style="padding:11px 14px;vertical-align:middle;text-align:right;white-space:nowrap;">
                  <a href="https://danielrakusan.cz" style="color:#16a34a;text-decoration:none;font-size:12px;font-weight:600;">danielrakusan.cz ↗</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>` },
  { id: 4, name: "Badge Style", theme: "light", description: "Python / AI / Open Source badges", html: `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:500px;width:100%;background:#fff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;padding:20px;">
        <tr><td style="padding:20px;">
          <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
            <tr>
              <td style="padding-right:14px;vertical-align:middle;">
                <table cellpadding="0" cellspacing="0" border="0"><tr>
                  <td width="100" height="100" style="background:linear-gradient(135deg,#22c55e,#86efac);border-radius:50px;padding:3px;width:100px;height:100px;">
                    <img src="https://github.com/DanielRakusan.png" width="94" height="94" style="border-radius:47px;display:block;border:3px solid #fff;" alt="Daniel Rakušan">
                  </td>
                </tr></table>
              </td>
              <td style="width:3px;background:linear-gradient(to bottom,#22c55e,#86efac);border-radius:2px;font-size:0;">&zwnj;</td>
              <td style="padding-left:16px;vertical-align:middle;">
                <div style="color:#111827;font-size:24px;font-weight:700;margin:0 0 4px;">Daniel Rakušan</div>
                <div style="color:#16a34a;font-size:13px;font-weight:600;margin-bottom:9px;">Junior Python Backend Developer</div>
                <!-- Tech badges -->
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding-right:6px;">
                      <span style="display:inline-flex;align-items:center;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:4px;padding:3px 10px;font-size:10px;color:#16a34a;font-weight:600;"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU1IiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiPjxwYXRoIGQ9Ik0xMjYuOTE2LjA3MmMtNjQuODMyIDAtNjAuNzg0IDI4LjExNS02MC43ODQgMjguMTE1bC4wNzIgMjkuMTI4aDYxLjg2OHY4Ljc0NUg0MS42MzFTLjE0NSA2MS4zNTUuMTQ1IDEyNi43N2MwIDY1LjQxNyAzNi4yMSA2My4wOTcgMzYuMjEgNjMuMDk3aDIxLjYxdi0zMC4zNTZzLTEuMTY1LTM2LjIxIDM1LjYzMi0zNi4yMWg2MS4zNjJzMzQuNDc1LjU1NyAzNC40NzUtMzMuMzE5VjMzLjk3UzE5NC42Ny4wNzIgMTI2LjkxNi4wNzJ6bS0zNC4xMTQgMTkuNTg2YTExLjEyIDExLjEyIDAgMCAxIDExLjEzIDExLjEzIDExLjEyIDExLjEyIDAgMCAxLTExLjEzIDExLjEzIDExLjEyIDExLjEyIDAgMCAxLTExLjEzLTExLjEzIDExLjEyIDExLjEyIDAgMCAxIDExLjEzLTExLjEzeiIgZmlsbD0icmdiKDU1LDExOCwxNzEpIi8+PHBhdGggZD0iTTEyOC43NTcgMjU0LjEyNmM2NC44MzIgMCA2MC43ODQtMjguMTE1IDYwLjc4NC0yOC4xMTVsLS4wNzItMjkuMTI4SDEyNy42di04Ljc0NWg4Ni40NDFzNDEuNDg2IDQuNzA1IDQxLjQ4Ni02MC43MTJjMC02NS40MTYtMzYuMjEtNjMuMDk2LTM2LjIxLTYzLjA5NmgtMjEuNjF2MzAuMzU1czEuMTY1IDM2LjIxLTM1LjYzMiAzNi4yMWgtNjEuMzYycy0zNC40NzUtLjU1Ny0zNC40NzUgMzMuMzJ2NTYuMDEzcy01LjIzNSAzMy44OTggNjIuNTE4IDMzLjg5OHptMzQuMTE0LTE5LjU4NmExMS4xMiAxMS4xMiAwIDAgMS0xMS4xMy0xMS4xMyAxMS4xMiAxMS4xMiAwIDAgMSAxMS4xMy0xMS4xMyAxMS4xMiAxMS4xMiAwIDAgMSAxMS4xMyAxMS4xMyAxMS4xMiAxMS4xMiAwIDAgMS0xMS4xMyAxMS4xM3oiIGZpbGw9InJnYigyNTUsMjEyLDU5KSIvPjwvc3ZnPg==" width="13" height="13" style="margin-right:5px;vertical-align:middle;" alt="">Python</span>
                    </td>
                    <td style="padding-right:6px;">
                      <span style="display:inline-flex;align-items:center;background:#eff6ff;border:1px solid #bfdbfe;border-radius:4px;padding:3px 10px;font-size:10px;color:#2563eb;font-weight:600;"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgNWEzIDMgMCAxIDAtNS45OTcuMTQyIDQgNCAwIDAgMC0yLjUyNiA1Ljc3IDQgNCAwIDAgMCAuNTU2IDYuNTg4IDQgNCAwIDAgMCA3LjYzNiAyaC43ODhhNCA0IDAgMCAwIDcuNjM2LTIgNCA0IDAgMCAwIC41NTYtNi41ODggNCA0IDAgMCAwLTIuNTI2LTUuNzdBMyAzIDAgMSAwIDEyIDUiIHN0cm9rZT0icmdiKDc1LDg1LDk5KSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNy41OTkgNi41YTMgMyAwIDAgMCAuMzk5LTEuMzc1TTYuMDAzIDUuMTI1QTMgMyAwIDAgMCA2LjQwMSA2LjVNMy40NzcgMTAuODk2YTQgNCAwIDAgMSAuNTg1LS4zOTZNMTkuOTM4IDEwLjVhNCA0IDAgMCAxIC41ODUuMzk2TTYgMThhNCA0IDAgMCAxLTEuOTY3LS41MTZNMTkuOTY3IDE3LjQ4NEE0IDQgMCAwIDEgMTggMTgiIHN0cm9rZT0icmdiKDc1LDg1LDk5KSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==" width="13" height="13" style="margin-right:5px;vertical-align:middle;" alt="">AI</span>
                    </td>
                    <td>
                      <span style="display:inline-flex;align-items:center;background:#f8fafc;border:1px solid #e2e8f0;border-radius:4px;padding:3px 10px;font-size:10px;color:#374151;font-weight:600;"><span style="color:#16a34a;font-weight:700;margin-right:4px;">&lt;/&gt;</span>Open Source</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <div style="height:1px;background:#f1f5f9;margin-bottom:10px;"></div>
          <!-- Linky v jednom řádku -->
          <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
            <tr>
              <td style="padding-right:14px;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMjEuNzUgNi43NXYxMC41YTIuMjUgMi4yNSAwIDAxLTIuMjUgMi4yNWgtMTVhMi4yNSAyLjI1IDAgMDEtMi4yNS0yLjI1VjYuNzVtMTkuNSAwQTIuMjUgMi4yNSAwIDAwMTkuNSA0LjVoLTE1YTIuMjUgMi4yNSAwIDAwLTIuMjUgMi4yNW0xOS41IDB2LjI0M2EyLjI1IDIuMjUgMCAwMS0xLjA3IDEuOTE2bC03LjUgNC42MTVhMi4yNSAyLjI1IDAgMDEtMi4zNiAwTDMuMzIgOC45MWEyLjI1IDIuMjUgMCAwMS0xLjA3LTEuOTE2VjYuNzUiIHN0cm9rZT0icmdiKDIyLDE2Myw3NCkiLz48L3N2Zz4=" width="14" height="14" style="vertical-align:middle;margin-right:5px;" alt="">
                <a href="mailto:rakusan.dev@gmail.com" style="color:#374151;text-decoration:none;font-size:11px;">rakusan.dev@gmail.com</a>
              </td>
              <td style="border-left:1px solid #e2e8f0;padding-left:12px;padding-right:14px;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMTIgMjFhOS4wMDQgOS4wMDQgMCAwMDguNzE2LTYuNzQ3TTEyIDIxYTkuMDA0IDkuMDA0IDAgMDEtOC43MTYtNi43NDdNMTIgMjFjMi40ODUgMCA0LjUtNC4wMyA0LjUtOVMxNC40ODUgMyAxMiAzbTAgMThjLTIuNDg1IDAtNC41LTQuMDMtNC41LTlTOS41MTUgMyAxMiAzbTAgMGE4Ljk5NyA4Ljk5NyAwIDAxNy44NDMgNC41ODJNMTIgM2E4Ljk5NyA4Ljk5NyAwIDAwLTcuODQzIDQuNTgybTE1LjY4NiAwQTExLjk1MyAxMS45NTMgMCAwMTEyIDEwLjVjLTIuOTk4IDAtNS43NC0xLjEtNy44NDMtMi45MThtMTUuNjg2IDBBOC45NTkgOC45NTkgMCAwMTIxIDEyYzAgLjc3OC0uMDk5IDEuNTMzLS4yODQgMi4yNTNtMCAwQTE3LjkxOSAxNy45MTkgMCAwMTEyIDE2LjVjLTMuMTYyIDAtNi4xMzMtLjgxNS04LjcxNi0yLjI0N20wIDBBOS4wMTUgOS4wMTUgMCAwMTMgMTJjMC0xLjYwNS40Mi0zLjExMyAxLjE1Ny00LjQxOCIgc3Ryb2tlPSJyZ2IoMjIsMTYzLDc0KSIvPjwvc3ZnPg==" width="14" height="14" style="vertical-align:middle;margin-right:5px;" alt="">
                <a href="https://danielrakusan.cz" style="color:#374151;text-decoration:none;font-size:11px;">danielrakusan.cz</a>
              </td>
              <td style="border-left:1px solid #e2e8f0;padding-left:12px;padding-right:14px;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0icmdiKDM2LDQxLDQ2KSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMEM1LjM3IDAgMCA1LjM3IDAgMTJjMCA1LjMxIDMuNDM1IDkuNzk1IDguMjA1IDExLjM4NS42LjEwNS44MjUtLjI1NS44MjUtLjU3IDAtLjI4NS0uMDE1LTEuMjMtLjAxNS0yLjIzNS0zLjAxNS41NTUtMy43OTUtLjczNS00LjAzNS0xLjQxLS4xMzUtLjM0NS0uNzItMS40MS0xLjIzLTEuNjk1LS40Mi0uMjI1LTEuMDItLjc4LS4wMTUtLjc5NS45NDUtLjAxNSAxLjYyLjg3IDEuODQ1IDEuMjMgMS4wOCAxLjgxNSAyLjgwNSAxLjMwNSAzLjQ5NS45OS4xMDUtLjc4LjQyLTEuMzA1Ljc2NS0xLjYwNS0yLjY3LS4zLTUuNDYtMS4zMzUtNS40Ni01LjkyNSAwLTEuMzA1LjQ2NS0yLjM4NSAxLjIzLTMuMjI1LS4xMi0uMy0uNTQtMS41My4xMi0zLjE4IDAgMCAxLjAwNS0uMzE1IDMuMyAxLjIzLjk2LS4yNyAxLjk4LS40MDUgMy0uNDA1czIuMDQuMTM1IDMgLjQwNWMyLjI5NS0xLjU2IDMuMy0xLjIzIDMuMy0xLjIzLjY2IDEuNjUuMjQgMi44OC4xMiAzLjE4Ljc2NS44NCAxLjIzIDEuOTA1IDEuMjMgMy4yMjUgMCA0LjYwNS0yLjgwNSA1LjYyNS01LjQ3NSA1LjkyNS40MzUuMzc1LjgxIDEuMDk1LjgxIDIuMjIgMCAxLjYwNS0uMDE1IDIuODk1LS4wMTUgMy4zIDAgLjMxNS4yMjUuNjkuODI1LjU3QTEyLjAyIDEyLjAyIDAgMDAyNCAxMmMwLTYuNjMtNS4zNy0xMi0xMi0xMnoiLz48L3N2Zz4=" width="14" height="14" style="vertical-align:middle;margin-right:5px;" alt="">
                <a href="https://github.com/DanielRakusan" style="color:#374151;text-decoration:none;font-size:11px;">GitHub</a>
              </td>
              <td style="border-left:1px solid #e2e8f0;padding-left:12px;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0icmdiKDAsMTE5LDE4MSkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIwLjQ0NyAyMC40NTJoLTMuNTU0di01LjU2OWMwLTEuMzI4LS4wMjctMy4wMzctMS44NTItMy4wMzctMS44NTMgMC0yLjEzNiAxLjQ0NS0yLjEzNiAyLjkzOXY1LjY2N0g5LjM1MVY5aDMuNDE0djEuNTYxaC4wNDZjLjQ3Ny0uOSAxLjYzNy0xLjg1IDMuMzctMS44NSAzLjYwMSAwIDQuMjY3IDIuMzcgNC4yNjcgNS40NTV2Ni4yODZ6TTUuMzM3IDcuNDMzYTIuMDYyIDIuMDYyIDAgMDEtMi4wNjMtMi4wNjUgMi4wNjQgMi4wNjQgMCAxMTIuMDYzIDIuMDY1em0xLjc4MiAxMy4wMTlIMy41NTVWOWgzLjU2NHYxMS40NTJ6TTIyLjIyNSAwSDEuNzcxQy43OTIgMCAwIC43NzQgMCAxLjcyOXYyMC41NDJDMCAyMy4yMjcuNzkyIDI0IDEuNzcxIDI0aDIwLjQ1MUMyMy4yIDI0IDI0IDIzLjIyNyAyNCAyMi4yNzFWMS43MjlDMjQgLjc3NCAyMy4yIDAgMjIuMjIyIDBoLjAwM3oiLz48L3N2Zz4=" width="14" height="14" style="vertical-align:middle;margin-right:5px;" alt="">
                <a href="https://linkedin.com/in/daniel-rakusan" style="color:#374151;text-decoration:none;font-size:11px;">LinkedIn</a>
              </td>
            </tr>
          </table>
          <!-- Info box -->
          <table cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;">
            <tr>
              <td style="padding:12px 14px;vertical-align:middle;width:40px;"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTUuNTkgMTQuMzdhNiA2IDAgMDEtNS44NCA3LjM4di00LjhtNS44NC0yLjU4YTE0Ljk4IDE0Ljk4IDAgMDA2LjE2LTEyLjEyQTE0Ljk4IDE0Ljk4IDAgMDA5LjYzMSA4LjQxbTUuOTYgNS45NmExNC45MjYgMTQuOTI2IDAgMDEtNS44NDEgMi41OG0tLjExOS04LjU0YTYgNiAwIDAwLTcuMzgxIDUuODRoNC44bTIuNTgxLTUuODRhMTQuOTI3IDE0LjkyNyAwIDAwLTIuNTggNS44NG0yLjY5OSAyLjdjLS4xMDMuMDIxLS4yMDcuMDQxLS4zMTEuMDZhMTUuMDkgMTUuMDkgMCAwMS0yLjQ0OC0yLjQ0OCAxNC45IDE0LjkgMCAwMS4wNi0uMzEybS0yLjI0IDIuMzlhNC40OTMgNC40OTMgMCAwMC0xLjc1NyA0LjMwNiA0LjQ5MyA0LjQ5MyAwIDAwNC4zMDYtMS43NThNMTYuNSA5YTEuNSAxLjUgMCAxMS0zIDAgMS41IDEuNSAwIDAxMyAweiIgc3Ryb2tlPSJyZ2IoMjIsMTYzLDc0KSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==" width="26" height="26" style="vertical-align:middle;display:block;" alt=""></td>
              <td style="padding:11px 0;vertical-align:middle;">
                <div style="font-size:13px;font-weight:700;color:#111827;margin-bottom:3px;">Currently building practical Python and AI projects.</div>
                <div style="font-size:12px;color:#6b7280;">Check out my portfolio and latest work.</div>
              </td>
              <td style="padding:11px 14px;vertical-align:middle;text-align:right;white-space:nowrap;">
                <a href="https://danielrakusan.cz" style="color:#16a34a;text-decoration:none;font-size:12px;font-weight:600;">danielrakusan.cz ↗</a>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>` },
  { id: 5, name: "Dark Terminal", theme: "dark", description: "Monospace, zelen\u00fd >_ symbol", html: `<table cellpadding="0" cellspacing="0" border="0" style="font-family:'Courier New',Courier,monospace;max-width:500px;width:100%;background:#0d1117;border-radius:12px;border:1px solid #30363d;overflow:hidden;">
        <tr>
          <td style="width:3px;background:linear-gradient(to bottom,#4ade80,#166534);font-size:0;">&zwnj;</td>
          <td style="padding:20px 20px 0 20px;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
              <tr>
                <td style="padding-right:18px;vertical-align:middle;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="border:2px solid #4ade80;border-radius:8px;display:block;line-height:0;">
                        <img src="https://github.com/DanielRakusan.png" width="90" height="90" style="border-radius:6px;display:block;object-fit:cover;" alt="Daniel Rakušan">
                      </td>
                    </tr>
                    <tr>
                      <td style="color:#4ade80;font-size:13px;font-family:'Courier New',monospace;padding-top:5px;">&gt;_</td>
                    </tr>
                  </table>
                </td>
                <td style="vertical-align:middle;">
                  <div style="color:#ffffff;font-size:22px;font-weight:700;margin:0 0 4px;letter-spacing:-0.01em;">Daniel Rakušan<span style="color:#4ade80;">█</span></div>
                  <div style="color:#4ade80;font-size:13px;font-weight:600;margin-bottom:8px;">Junior Python Backend Developer</div>
                  <div style="font-size:12px;color:#6b7280;">&#128205; Praha / Remote</div>
                </td>
              </tr>
            </table>
            <div style="height:1px;background:#21262d;margin-bottom:12px;"></div>
            <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
              <tr><td style="padding-bottom:7px;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMjEuNzUgNi43NXYxMC41YTIuMjUgMi4yNSAwIDAxLTIuMjUgMi4yNWgtMTVhMi4yNSAyLjI1IDAgMDEtMi4yNS0yLjI1VjYuNzVtMTkuNSAwQTIuMjUgMi4yNSAwIDAwMTkuNSA0LjVoLTE1YTIuMjUgMi4yNSAwIDAwLTIuMjUgMi4yNW0xOS41IDB2LjI0M2EyLjI1IDIuMjUgMCAwMS0xLjA3IDEuOTE2bC03LjUgNC42MTVhMi4yNSAyLjI1IDAgMDEtMi4zNiAwTDMuMzIgOC45MWEyLjI1IDIuMjUgMCAwMS0xLjA3LTEuOTE2VjYuNzUiIHN0cm9rZT0icmdiKDc0LDIyMiwxMjgpIi8+PC9zdmc+" width="14" height="14" style="vertical-align:middle;margin-right:8px;" alt="">
                <a href="mailto:rakusan.dev@gmail.com" style="color:#8b949e;text-decoration:none;font-size:12px;vertical-align:middle;">rakusan.dev@gmail.com</a>
              </td></tr>
              <tr><td style="padding-bottom:7px;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMTIgMjFhOS4wMDQgOS4wMDQgMCAwMDguNzE2LTYuNzQ3TTEyIDIxYTkuMDA0IDkuMDA0IDAgMDEtOC43MTYtNi43NDdNMTIgMjFjMi40ODUgMCA0LjUtNC4wMyA0LjUtOVMxNC40ODUgMyAxMiAzbTAgMThjLTIuNDg1IDAtNC41LTQuMDMtNC41LTlTOS41MTUgMyAxMiAzbTAgMGE4Ljk5NyA4Ljk5NyAwIDAxNy44NDMgNC41ODJNMTIgM2E4Ljk5NyA4Ljk5NyAwIDAwLTcuODQzIDQuNTgybTE1LjY4NiAwQTExLjk1MyAxMS45NTMgMCAwMTEyIDEwLjVjLTIuOTk4IDAtNS43NC0xLjEtNy44NDMtMi45MThtMTUuNjg2IDBBOC45NTkgOC45NTkgMCAwMTIxIDEyYzAgLjc3OC0uMDk5IDEuNTMzLS4yODQgMi4yNTNtMCAwQTE3LjkxOSAxNy45MTkgMCAwMTEyIDE2LjVjLTMuMTYyIDAtNi4xMzMtLjgxNS04LjcxNi0yLjI0N20wIDBBOS4wMTUgOS4wMTUgMCAwMTMgMTJjMC0xLjYwNS40Mi0zLjExMyAxLjE1Ny00LjQxOCIgc3Ryb2tlPSJyZ2IoNzQsMjIyLDEyOCkiLz48L3N2Zz4=" width="14" height="14" style="vertical-align:middle;margin-right:8px;" alt="">
                <a href="https://danielrakusan.cz" style="color:#8b949e;text-decoration:none;font-size:12px;vertical-align:middle;">danielrakusan.cz</a>
              </td></tr>
              <tr><td style="padding-bottom:7px;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0icmdiKDIwMCwyMTAsMjIwKSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMEM1LjM3IDAgMCA1LjM3IDAgMTJjMCA1LjMxIDMuNDM1IDkuNzk1IDguMjA1IDExLjM4NS42LjEwNS44MjUtLjI1NS44MjUtLjU3IDAtLjI4NS0uMDE1LTEuMjMtLjAxNS0yLjIzNS0zLjAxNS41NTUtMy43OTUtLjczNS00LjAzNS0xLjQxLS4xMzUtLjM0NS0uNzItMS40MS0xLjIzLTEuNjk1LS40Mi0uMjI1LTEuMDItLjc4LS4wMTUtLjc5NS45NDUtLjAxNSAxLjYyLjg3IDEuODQ1IDEuMjMgMS4wOCAxLjgxNSAyLjgwNSAxLjMwNSAzLjQ5NS45OS4xMDUtLjc4LjQyLTEuMzA1Ljc2NS0xLjYwNS0yLjY3LS4zLTUuNDYtMS4zMzUtNS40Ni01LjkyNSAwLTEuMzA1LjQ2NS0yLjM4NSAxLjIzLTMuMjI1LS4xMi0uMy0uNTQtMS41My4xMi0zLjE4IDAgMCAxLjAwNS0uMzE1IDMuMyAxLjIzLjk2LS4yNyAxLjk4LS40MDUgMy0uNDA1czIuMDQuMTM1IDMgLjQwNWMyLjI5NS0xLjU2IDMuMy0xLjIzIDMuMy0xLjIzLjY2IDEuNjUuMjQgMi44OC4xMiAzLjE4Ljc2NS44NCAxLjIzIDEuOTA1IDEuMjMgMy4yMjUgMCA0LjYwNS0yLjgwNSA1LjYyNS01LjQ3NSA1LjkyNS40MzUuMzc1LjgxIDEuMDk1LjgxIDIuMjIgMCAxLjYwNS0uMDE1IDIuODk1LS4wMTUgMy4zIDAgLjMxNS4yMjUuNjkuODI1LjU3QTEyLjAyIDEyLjAyIDAgMDAyNCAxMmMwLTYuNjMtNS4zNy0xMi0xMi0xMnoiLz48L3N2Zz4=" width="14" height="14" style="vertical-align:middle;margin-right:8px;" alt="">
                <a href="https://github.com/DanielRakusan" style="color:#8b949e;text-decoration:none;font-size:12px;vertical-align:middle;">github.com/DanielRakusan</a>
              </td></tr>
              <tr><td>
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0icmdiKDIwMCwyMTAsMjIwKSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAuNDQ3IDIwLjQ1MmgtMy41NTR2LTUuNTY5YzAtMS4zMjgtLjAyNy0zLjAzNy0xLjg1Mi0zLjAzNy0xLjg1MyAwLTIuMTM2IDEuNDQ1LTIuMTM2IDIuOTM5djUuNjY3SDkuMzUxVjloMy40MTR2MS41NjFoLjA0NmMuNDc3LS45IDEuNjM3LTEuODUgMy4zNy0xLjg1IDMuNjAxIDAgNC4yNjcgMi4zNyA0LjI2NyA1LjQ1NXY2LjI4NnpNNS4zMzcgNy40MzNhMi4wNjIgMi4wNjIgMCAwMS0yLjA2My0yLjA2NSAyLjA2NCAyLjA2NCAwIDExMi4wNjMgMi4wNjV6bTEuNzgyIDEzLjAxOUgzLjU1NVY5aDMuNTY0djExLjQ1MnpNMjIuMjI1IDBIMS43NzFDLjc5MiAwIDAgLjc3NCAwIDEuNzI5djIwLjU0MkMwIDIzLjIyNy43OTIgMjQgMS43NzEgMjRoMjAuNDUxQzIzLjIgMjQgMjQgMjMuMjI3IDI0IDIyLjI3MVYxLjcyOUMyNCAuNzc0IDIzLjIgMCAyMi4yMjIgMGguMDAzeiIvPjwvc3ZnPg==" width="14" height="14" style="vertical-align:middle;margin-right:8px;" alt="">
                <a href="https://linkedin.com/in/daniel-rakusan" style="color:#8b949e;text-decoration:none;font-size:12px;vertical-align:middle;">linkedin.com/in/daniel-rakusan</a>
              </td></tr>
            </table>
            <table cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#161b22;border-radius:8px;border:1px solid #30363d;margin-bottom:16px;">
              <tr>
                <td style="padding:12px 14px;vertical-align:middle;width:38px;"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMTcuMjUgNi43NUwyMi41IDEybC01LjI1IDUuMjVtLTEwLjUgMEwxLjUgMTJsNS4yNS01LjI1bTcuNS0zbC00LjUgMTYuNSIgc3Ryb2tlPSJyZ2IoNzQsMjIyLDEyOCkiLz48L3N2Zz4=" width="22" height="22" style="vertical-align:middle;display:block;" alt=""></td>
                <td style="padding:12px 0;vertical-align:middle;">
                  <div style="font-size:13px;color:#e6edf3;line-height:1.4;">Building practical tools with Python and sharing my projects in public.</div>
                </td>
                <td style="padding:12px 14px;vertical-align:middle;text-align:right;white-space:nowrap;">
                  <a href="https://danielrakusan.cz" style="color:#4ade80;text-decoration:none;font-size:12px;font-weight:600;white-space:nowrap;">danielrakusan.cz &#x2192;</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>` },
  { id: 6, name: "Dark Space", theme: "dark", description: "Fialovo-cyan gradient ring", html: `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:500px;width:100%;background:#030712;border-radius:12px;border:1px solid #1e1b4b;overflow:hidden;">
        <tr><td style="padding:22px 22px 0 22px;">
          <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;">
            <tr>
              <td style="padding-right:20px;vertical-align:middle;">
                <table cellpadding="0" cellspacing="0" border="0"><tr>
                  <td width="110" height="110" style="background:linear-gradient(135deg,#7c3aed,#22d3ee);border-radius:55px;padding:3px;width:110px;height:110px;">
                    <img src="https://github.com/DanielRakusan.png" width="104" height="104" style="border-radius:52px;display:block;border:3px solid #030712;object-fit:cover;" alt="Daniel Rakušan">
                  </td>
                </tr></table>
              </td>
              <td style="vertical-align:middle;">
                <div style="color:#ffffff;font-size:26px;font-weight:800;margin:0 0 4px;letter-spacing:-0.02em;">Daniel Rakušan</div>
                <div style="color:#22d3ee;font-size:14px;font-weight:600;margin-bottom:9px;">Junior Python Backend Developer</div>
                <div style="font-size:12px;color:#6b7280;">
                  <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#7c3aed;vertical-align:middle;margin-right:5px;"></span>Praha / Remote
                </div>
              </td>
            </tr>
          </table>
          <div style="height:1px;background:#1e1b4b;margin-bottom:14px;"></div>
          <table cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:14px;">
            <tr>
              <td style="padding-bottom:8px;width:50%;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMjEuNzUgNi43NXYxMC41YTIuMjUgMi4yNSAwIDAxLTIuMjUgMi4yNWgtMTVhMi4yNSAyLjI1IDAgMDEtMi4yNS0yLjI1VjYuNzVtMTkuNSAwQTIuMjUgMi4yNSAwIDAwMTkuNSA0LjVoLTE1YTIuMjUgMi4yNSAwIDAwLTIuMjUgMi4yNW0xOS41IDB2LjI0M2EyLjI1IDIuMjUgMCAwMS0xLjA3IDEuOTE2bC03LjUgNC42MTVhMi4yNSAyLjI1IDAgMDEtMi4zNiAwTDMuMzIgOC45MWEyLjI1IDIuMjUgMCAwMS0xLjA3LTEuOTE2VjYuNzUiIHN0cm9rZT0icmdiKDE0OCwxNjMsMTg0KSIvPjwvc3ZnPg==" width="14" height="14" style="vertical-align:middle;margin-right:7px;" alt="">
                <a href="mailto:rakusan.dev@gmail.com" style="color:#64748b;text-decoration:none;font-size:11px;vertical-align:middle;">rakusan.dev@gmail.com</a>
              </td>
              <td style="padding-bottom:8px;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMTIgMjFhOS4wMDQgOS4wMDQgMCAwMDguNzE2LTYuNzQ3TTEyIDIxYTkuMDA0IDkuMDA0IDAgMDEtOC43MTYtNi43NDdNMTIgMjFjMi40ODUgMCA0LjUtNC4wMyA0LjUtOVMxNC40ODUgMyAxMiAzbTAgMThjLTIuNDg1IDAtNC41LTQuMDMtNC41LTlTOS41MTUgMyAxMiAzbTAgMGE4Ljk5NyA4Ljk5NyAwIDAxNy44NDMgNC41ODJNMTIgM2E4Ljk5NyA4Ljk5NyAwIDAwLTcuODQzIDQuNTgybTE1LjY4NiAwQTExLjk1MyAxMS45NTMgMCAwMTEyIDEwLjVjLTIuOTk4IDAtNS43NC0xLjEtNy44NDMtMi45MThtMTUuNjg2IDBBOC45NTkgOC45NTkgMCAwMTIxIDEyYzAgLjc3OC0uMDk5IDEuNTMzLS4yODQgMi4yNTNtMCAwQTE3LjkxOSAxNy45MTkgMCAwMTEyIDE2LjVjLTMuMTYyIDAtNi4xMzMtLjgxNS04LjcxNi0yLjI0N20wIDBBOS4wMTUgOS4wMTUgMCAwMTMgMTJjMC0xLjYwNS40Mi0zLjExMyAxLjE1Ny00LjQxOCIgc3Ryb2tlPSJyZ2IoMTQ4LDE2MywxODQpIi8+PC9zdmc+" width="14" height="14" style="vertical-align:middle;margin-right:7px;" alt="">
                <a href="https://danielrakusan.cz" style="color:#64748b;text-decoration:none;font-size:11px;vertical-align:middle;">danielrakusan.cz</a>
              </td>
            </tr>
            <tr>
              <td>
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0icmdiKDIwMCwyMTAsMjIwKSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMEM1LjM3IDAgMCA1LjM3IDAgMTJjMCA1LjMxIDMuNDM1IDkuNzk1IDguMjA1IDExLjM4NS42LjEwNS44MjUtLjI1NS44MjUtLjU3IDAtLjI4NS0uMDE1LTEuMjMtLjAxNS0yLjIzNS0zLjAxNS41NTUtMy43OTUtLjczNS00LjAzNS0xLjQxLS4xMzUtLjM0NS0uNzItMS40MS0xLjIzLTEuNjk1LS40Mi0uMjI1LTEuMDItLjc4LS4wMTUtLjc5NS45NDUtLjAxNSAxLjYyLjg3IDEuODQ1IDEuMjMgMS4wOCAxLjgxNSAyLjgwNSAxLjMwNSAzLjQ5NS45OS4xMDUtLjc4LjQyLTEuMzA1Ljc2NS0xLjYwNS0yLjY3LS4zLTUuNDYtMS4zMzUtNS40Ni01LjkyNSAwLTEuMzA1LjQ2NS0yLjM4NSAxLjIzLTMuMjI1LS4xMi0uMy0uNTQtMS41My4xMi0zLjE4IDAgMCAxLjAwNS0uMzE1IDMuMyAxLjIzLjk2LS4yNyAxLjk4LS40MDUgMy0uNDA1czIuMDQuMTM1IDMgLjQwNWMyLjI5NS0xLjU2IDMuMy0xLjIzIDMuMy0xLjIzLjY2IDEuNjUuMjQgMi44OC4xMiAzLjE4Ljc2NS44NCAxLjIzIDEuOTA1IDEuMjMgMy4yMjUgMCA0LjYwNS0yLjgwNSA1LjYyNS01LjQ3NSA1LjkyNS40MzUuMzc1LjgxIDEuMDk1LjgxIDIuMjIgMCAxLjYwNS0uMDE1IDIuODk1LS4wMTUgMy4zIDAgLjMxNS4yMjUuNjkuODI1LjU3QTEyLjAyIDEyLjAyIDAgMDAyNCAxMmMwLTYuNjMtNS4zNy0xMi0xMi0xMnoiLz48L3N2Zz4=" width="14" height="14" style="vertical-align:middle;margin-right:7px;" alt="">
                <a href="https://github.com/DanielRakusan" style="color:#64748b;text-decoration:none;font-size:11px;vertical-align:middle;">github.com/DanielRakusan</a>
              </td>
              <td>
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0icmdiKDIwMCwyMTAsMjIwKSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAuNDQ3IDIwLjQ1MmgtMy41NTR2LTUuNTY5YzAtMS4zMjgtLjAyNy0zLjAzNy0xLjg1Mi0zLjAzNy0xLjg1MyAwLTIuMTM2IDEuNDQ1LTIuMTM2IDIuOTM5djUuNjY3SDkuMzUxVjloMy40MTR2MS41NjFoLjA0NmMuNDc3LS45IDEuNjM3LTEuODUgMy4zNy0xLjg1IDMuNjAxIDAgNC4yNjcgMi4zNyA0LjI2NyA1LjQ1NXY2LjI4NnpNNS4zMzcgNy40MzNhMi4wNjIgMi4wNjIgMCAwMS0yLjA2My0yLjA2NSAyLjA2NCAyLjA2NCAwIDExMi4wNjMgMi4wNjV6bTEuNzgyIDEzLjAxOUgzLjU1NVY5aDMuNTY0djExLjQ1MnpNMjIuMjI1IDBIMS43NzFDLjc5MiAwIDAgLjc3NCAwIDEuNzI5djIwLjU0MkMwIDIzLjIyNy43OTIgMjQgMS43NzEgMjRoMjAuNDUxQzIzLjIgMjQgMjQgMjMuMjI3IDI0IDIyLjI3MVYxLjcyOUMyNCAuNzc0IDIzLjIgMCAyMi4yMjIgMGguMDAzeiIvPjwvc3ZnPg==" width="14" height="14" style="vertical-align:middle;margin-right:7px;" alt="">
                <a href="https://linkedin.com/in/daniel-rakusan" style="color:#64748b;text-decoration:none;font-size:11px;vertical-align:middle;">linkedin.com/in/daniel-rakusan</a>
              </td>
            </tr>
          </table>
          <table cellpadding="0" cellspacing="0" border="0" style="width:100%;background:linear-gradient(135deg,rgba(124,58,237,.25),rgba(34,211,238,.1));border-radius:8px;border:1px solid rgba(124,58,237,.4);margin-bottom:18px;">
            <tr>
              <td style="padding:12px 14px;vertical-align:middle;width:38px;"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTUuNTkgMTQuMzdhNiA2IDAgMDEtNS44NCA3LjM4di00LjhtNS44NC0yLjU4YTE0Ljk4IDE0Ljk4IDAgMDA2LjE2LTEyLjEyQTE0Ljk4IDE0Ljk4IDAgMDA5LjYzMSA4LjQxbTUuOTYgNS45NmExNC45MjYgMTQuOTI2IDAgMDEtNS44NDEgMi41OG0tLjExOS04LjU0YTYgNiAwIDAwLTcuMzgxIDUuODRoNC44bTIuNTgxLTUuODRhMTQuOTI3IDE0LjkyNyAwIDAwLTIuNTggNS44NG0yLjY5OSAyLjdjLS4xMDMuMDIxLS4yMDcuMDQxLS4zMTEuMDZhMTUuMDkgMTUuMDkgMCAwMS0yLjQ0OC0yLjQ0OCAxNC45IDE0LjkgMCAwMS4wNi0uMzEybS0yLjI0IDIuMzlhNC40OTMgNC40OTMgMCAwMC0xLjc1NyA0LjMwNiA0LjQ5MyA0LjQ5MyAwIDAwNC4zMDYtMS43NThNMTYuNSA5YTEuNSAxLjUgMCAxMS0zIDAgMS41IDEuNSAwIDAxMyAweiIgc3Ryb2tlPSJyZ2IoMzQsMjExLDIzOCkiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=" width="24" height="24" style="vertical-align:middle;display:block;" alt=""></td>
              <td style="padding:12px 0;vertical-align:middle;">
                <div style="font-size:13px;font-weight:700;color:#e2e8f0;margin-bottom:3px;">Python &bull; AI &bull; Automation &bull; Problem Solving</div>
                <div style="font-size:12px;color:#94a3b8;">Turning ideas into working software.</div>
              </td>
              <td style="padding:12px 14px;vertical-align:middle;text-align:right;white-space:nowrap;">
                <a href="https://danielrakusan.cz" style="color:#22d3ee;text-decoration:none;font-size:12px;font-weight:600;">danielrakusan.cz &#x2192;</a>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>` },
  { id: 7, name: "Dark Hexagon", theme: "dark", description: "Split jm\u00e9no b\u00edlo / zelen\u00e9", html: `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:500px;width:100%;background:#0a0a0a;border-radius:12px;border:1px solid #1f2937;overflow:hidden;">
        <tr><td style="padding:20px 20px 0 20px;">
          <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
            <tr>
              <td style="padding-right:18px;vertical-align:middle;">
                <table cellpadding="0" cellspacing="0" border="0"><tr>
                  <td width="96" height="96" style="background:linear-gradient(135deg,#4ade80,#166534);border-radius:48px;padding:3px;width:96px;height:96px;box-shadow:0 0 20px rgba(74,222,128,.3);">
                    <img src="https://github.com/DanielRakusan.png" width="90" height="90" style="border-radius:45px;display:block;border:3px solid #0a0a0a;object-fit:cover;" alt="Daniel Rakušan">
                  </td>
                </tr></table>
              </td>
              <td style="vertical-align:middle;">
                <div style="font-size:24px;font-weight:800;margin:0 0 4px;letter-spacing:-0.02em;"><span style="color:#ffffff;">Daniel </span><span style="color:#4ade80;">Rakušan</span></div>
                <div style="color:#9ca3af;font-size:13px;font-weight:500;margin-bottom:8px;">Junior Python Backend Developer</div>
                <div style="font-size:12px;color:#6b7280;">&#128205; Praha / Remote</div>
              </td>
            </tr>
          </table>
          <div style="height:1px;background:#1f2937;margin-bottom:12px;"></div>
          <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
            <tr>
              <td style="padding-bottom:7px;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMjEuNzUgNi43NXYxMC41YTIuMjUgMi4yNSAwIDAxLTIuMjUgMi4yNWgtMTVhMi4yNSAyLjI1IDAgMDEtMi4yNS0yLjI1VjYuNzVtMTkuNSAwQTIuMjUgMi4yNSAwIDAwMTkuNSA0LjVoLTE1YTIuMjUgMi4yNSAwIDAwLTIuMjUgMi4yNW0xOS41IDB2LjI0M2EyLjI1IDIuMjUgMCAwMS0xLjA3IDEuOTE2bC03LjUgNC42MTVhMi4yNSAyLjI1IDAgMDEtMi4zNiAwTDMuMzIgOC45MWEyLjI1IDIuMjUgMCAwMS0xLjA3LTEuOTE2VjYuNzUiIHN0cm9rZT0icmdiKDc0LDIyMiwxMjgpIi8+PC9zdmc+" width="14" height="14" style="vertical-align:middle;margin-right:8px;" alt="">
                <a href="mailto:rakusan.dev@gmail.com" style="color:#9ca3af;text-decoration:none;font-size:12px;vertical-align:middle;">rakusan.dev@gmail.com</a>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:7px;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMTIgMjFhOS4wMDQgOS4wMDQgMCAwMDguNzE2LTYuNzQ3TTEyIDIxYTkuMDA0IDkuMDA0IDAgMDEtOC43MTYtNi43NDdNMTIgMjFjMi40ODUgMCA0LjUtNC4wMyA0LjUtOVMxNC40ODUgMyAxMiAzbTAgMThjLTIuNDg1IDAtNC41LTQuMDMtNC41LTlTOS41MTUgMyAxMiAzbTAgMGE4Ljk5NyA4Ljk5NyAwIDAxNy44NDMgNC41ODJNMTIgM2E4Ljk5NyA4Ljk5NyAwIDAwLTcuODQzIDQuNTgybTE1LjY4NiAwQTExLjk1MyAxMS45NTMgMCAwMTEyIDEwLjVjLTIuOTk4IDAtNS43NC0xLjEtNy44NDMtMi45MThtMTUuNjg2IDBBOC45NTkgOC45NTkgMCAwMTIxIDEyYzAgLjc3OC0uMDk5IDEuNTMzLS4yODQgMi4yNTNtMCAwQTE3LjkxOSAxNy45MTkgMCAwMTEyIDE2LjVjLTMuMTYyIDAtNi4xMzMtLjgxNS04LjcxNi0yLjI0N20wIDBBOS4wMTUgOS4wMTUgMCAwMTMgMTJjMC0xLjYwNS40Mi0zLjExMyAxLjE1Ny00LjQxOCIgc3Ryb2tlPSJyZ2IoNzQsMjIyLDEyOCkiLz48L3N2Zz4=" width="14" height="14" style="vertical-align:middle;margin-right:8px;" alt="">
                <a href="https://danielrakusan.cz" style="color:#9ca3af;text-decoration:none;font-size:12px;vertical-align:middle;">danielrakusan.cz</a>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:7px;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0icmdiKDIwMCwyMTAsMjIwKSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMEM1LjM3IDAgMCA1LjM3IDAgMTJjMCA1LjMxIDMuNDM1IDkuNzk1IDguMjA1IDExLjM4NS42LjEwNS44MjUtLjI1NS44MjUtLjU3IDAtLjI4NS0uMDE1LTEuMjMtLjAxNS0yLjIzNS0zLjAxNS41NTUtMy43OTUtLjczNS00LjAzNS0xLjQxLS4xMzUtLjM0NS0uNzItMS40MS0xLjIzLTEuNjk1LS40Mi0uMjI1LTEuMDItLjc4LS4wMTUtLjc5NS45NDUtLjAxNSAxLjYyLjg3IDEuODQ1IDEuMjMgMS4wOCAxLjgxNSAyLjgwNSAxLjMwNSAzLjQ5NS45OS4xMDUtLjc4LjQyLTEuMzA1Ljc2NS0xLjYwNS0yLjY3LS4zLTUuNDYtMS4zMzUtNS40Ni01LjkyNSAwLTEuMzA1LjQ2NS0yLjM4NSAxLjIzLTMuMjI1LS4xMi0uMy0uNTQtMS41My4xMi0zLjE4IDAgMCAxLjAwNS0uMzE1IDMuMyAxLjIzLjk2LS4yNyAxLjk4LS40MDUgMy0uNDA1czIuMDQuMTM1IDMgLjQwNWMyLjI5NS0xLjU2IDMuMy0xLjIzIDMuMy0xLjIzLjY2IDEuNjUuMjQgMi44OC4xMiAzLjE4Ljc2NS44NCAxLjIzIDEuOTA1IDEuMjMgMy4yMjUgMCA0LjYwNS0yLjgwNSA1LjYyNS01LjQ3NSA1LjkyNS40MzUuMzc1LjgxIDEuMDk1LjgxIDIuMjIgMCAxLjYwNS0uMDE1IDIuODk1LS4wMTUgMy4zIDAgLjMxNS4yMjUuNjkuODI1LjU3QTEyLjAyIDEyLjAyIDAgMDAyNCAxMmMwLTYuNjMtNS4zNy0xMi0xMi0xMnoiLz48L3N2Zz4=" width="14" height="14" style="vertical-align:middle;margin-right:8px;" alt="">
                <a href="https://github.com/DanielRakusan" style="color:#9ca3af;text-decoration:none;font-size:12px;vertical-align:middle;">github.com/DanielRakusan</a>
              </td>
            </tr>
            <tr>
              <td>
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0icmdiKDIwMCwyMTAsMjIwKSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAuNDQ3IDIwLjQ1MmgtMy41NTR2LTUuNTY5YzAtMS4zMjgtLjAyNy0zLjAzNy0xLjg1Mi0zLjAzNy0xLjg1MyAwLTIuMTM2IDEuNDQ1LTIuMTM2IDIuOTM5djUuNjY3SDkuMzUxVjloMy40MTR2MS41NjFoLjA0NmMuNDc3LS45IDEuNjM3LTEuODUgMy4zNy0xLjg1IDMuNjAxIDAgNC4yNjcgMi4zNyA0LjI2NyA1LjQ1NXY2LjI4NnpNNS4zMzcgNy40MzNhMi4wNjIgMi4wNjIgMCAwMS0yLjA2My0yLjA2NSAyLjA2NCAyLjA2NCAwIDExMi4wNjMgMi4wNjV6bTEuNzgyIDEzLjAxOUgzLjU1NVY5aDMuNTY0djExLjQ1MnpNMjIuMjI1IDBIMS43NzFDLjc5MiAwIDAgLjc3NCAwIDEuNzI5djIwLjU0MkMwIDIzLjIyNy43OTIgMjQgMS43NzEgMjRoMjAuNDUxQzIzLjIgMjQgMjQgMjMuMjI3IDI0IDIyLjI3MVYxLjcyOUMyNCAuNzc0IDIzLjIgMCAyMi4yMjIgMGguMDAzeiIvPjwvc3ZnPg==" width="14" height="14" style="vertical-align:middle;margin-right:8px;" alt="">
                <a href="https://linkedin.com/in/daniel-rakusan" style="color:#9ca3af;text-decoration:none;font-size:12px;vertical-align:middle;">linkedin.com/in/daniel-rakusan</a>
              </td>
            </tr>
          </table>
          <table cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#111827;border-radius:8px;border:1px solid #1f2937;margin-bottom:16px;">
            <tr>
              <td style="padding:12px 14px;vertical-align:middle;width:38px;"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMTcuMjUgNi43NUwyMi41IDEybC01LjI1IDUuMjVtLTEwLjUgMEwxLjUgMTJsNS4yNS01LjI1bTcuNS0zbC00LjUgMTYuNSIgc3Ryb2tlPSJyZ2IoNzQsMjIyLDEyOCkiLz48L3N2Zz4=" width="22" height="22" style="vertical-align:middle;display:block;" alt=""></td>
              <td style="padding:12px 0;vertical-align:middle;">
                <div style="font-size:13px;color:#d1d5db;line-height:1.4;">I build practical Python tools, explore AI and share everything on my portfolio.</div>
              </td>
              <td style="padding:12px 14px;vertical-align:middle;text-align:right;white-space:nowrap;">
                <a href="https://danielrakusan.cz" style="color:#4ade80;text-decoration:none;font-size:12px;font-weight:600;">danielrakusan.cz &#x2192;</a>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>` },
  { id: 8, name: "Dark Grid", theme: "dark", description: "Tmav\u00e9 pozad\u00ed + b\u00edl\u00fd info box", html: `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:500px;width:100%;background:#050505;border-radius:12px;border:1px solid #1a2a1a;overflow:hidden;">
        <tr><td style="padding:22px 22px 0 22px;">
          <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
            <tr>
              <td style="padding-right:18px;vertical-align:middle;">
                <table cellpadding="0" cellspacing="0" border="0"><tr>
                  <td width="100" height="100" style="background:linear-gradient(135deg,#4ade80,#064e3b);border-radius:50px;padding:3px;width:100px;height:100px;">
                    <img src="https://github.com/DanielRakusan.png" width="94" height="94" style="border-radius:47px;display:block;border:3px solid #050505;object-fit:cover;" alt="Daniel Rakušan">
                  </td>
                </tr></table>
              </td>
              <td style="vertical-align:middle;">
                <div style="color:#ffffff;font-size:24px;font-weight:800;margin:0 0 4px;letter-spacing:-0.02em;">Daniel Rakušan</div>
                <div style="color:#4ade80;font-size:13px;font-weight:600;margin-bottom:8px;">Junior Python Backend Developer</div>
                <div style="font-size:12px;color:#6b7280;">&#128205; Praha / Remote</div>
              </td>
            </tr>
          </table>
          <div style="height:1px;background:#1a2a1a;margin-bottom:12px;"></div>
          <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
            <tr>
              <td style="padding-right:14px;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMjEuNzUgNi43NXYxMC41YTIuMjUgMi4yNSAwIDAxLTIuMjUgMi4yNWgtMTVhMi4yNSAyLjI1IDAgMDEtMi4yNS0yLjI1VjYuNzVtMTkuNSAwQTIuMjUgMi4yNSAwIDAwMTkuNSA0LjVoLTE1YTIuMjUgMi4yNSAwIDAwLTIuMjUgMi4yNW0xOS41IDB2LjI0M2EyLjI1IDIuMjUgMCAwMS0xLjA3IDEuOTE2bC03LjUgNC42MTVhMi4yNSAyLjI1IDAgMDEtMi4zNiAwTDMuMzIgOC45MWEyLjI1IDIuMjUgMCAwMS0xLjA3LTEuOTE2VjYuNzUiIHN0cm9rZT0icmdiKDc0LDIyMiwxMjgpIi8+PC9zdmc+" width="13" height="13" style="vertical-align:middle;margin-right:5px;" alt="">
                <a href="mailto:rakusan.dev@gmail.com" style="color:#6b7280;text-decoration:none;font-size:11px;vertical-align:middle;">rakusan.dev@gmail.com</a>
              </td>
              <td style="border-left:1px solid #1a2a1a;padding-left:12px;padding-right:14px;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMTIgMjFhOS4wMDQgOS4wMDQgMCAwMDguNzE2LTYuNzQ3TTEyIDIxYTkuMDA0IDkuMDA0IDAgMDEtOC43MTYtNi43NDdNMTIgMjFjMi40ODUgMCA0LjUtNC4wMyA0LjUtOVMxNC40ODUgMyAxMiAzbTAgMThjLTIuNDg1IDAtNC41LTQuMDMtNC41LTlTOS41MTUgMyAxMiAzbTAgMGE4Ljk5NyA4Ljk5NyAwIDAxNy44NDMgNC41ODJNMTIgM2E4Ljk5NyA4Ljk5NyAwIDAwLTcuODQzIDQuNTgybTE1LjY4NiAwQTExLjk1MyAxMS45NTMgMCAwMTEyIDEwLjVjLTIuOTk4IDAtNS43NC0xLjEtNy44NDMtMi45MThtMTUuNjg2IDBBOC45NTkgOC45NTkgMCAwMTIxIDEyYzAgLjc3OC0uMDk5IDEuNTMzLS4yODQgMi4yNTNtMCAwQTE3LjkxOSAxNy45MTkgMCAwMTEyIDE2LjVjLTMuMTYyIDAtNi4xMzMtLjgxNS04LjcxNi0yLjI0N20wIDBBOS4wMTUgOS4wMTUgMCAwMTMgMTJjMC0xLjYwNS40Mi0zLjExMyAxLjE1Ny00LjQxOCIgc3Ryb2tlPSJyZ2IoNzQsMjIyLDEyOCkiLz48L3N2Zz4=" width="13" height="13" style="vertical-align:middle;margin-right:5px;" alt="">
                <a href="https://danielrakusan.cz" style="color:#6b7280;text-decoration:none;font-size:11px;vertical-align:middle;">danielrakusan.cz</a>
              </td>
              <td style="border-left:1px solid #1a2a1a;padding-left:12px;padding-right:14px;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0icmdiKDIwMCwyMTAsMjIwKSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMEM1LjM3IDAgMCA1LjM3IDAgMTJjMCA1LjMxIDMuNDM1IDkuNzk1IDguMjA1IDExLjM4NS42LjEwNS44MjUtLjI1NS44MjUtLjU3IDAtLjI4NS0uMDE1LTEuMjMtLjAxNS0yLjIzNS0zLjAxNS41NTUtMy43OTUtLjczNS00LjAzNS0xLjQxLS4xMzUtLjM0NS0uNzItMS40MS0xLjIzLTEuNjk1LS40Mi0uMjI1LTEuMDItLjc4LS4wMTUtLjc5NS45NDUtLjAxNSAxLjYyLjg3IDEuODQ1IDEuMjMgMS4wOCAxLjgxNSAyLjgwNSAxLjMwNSAzLjQ5NS45OS4xMDUtLjc4LjQyLTEuMzA1Ljc2NS0xLjYwNS0yLjY3LS4zLTUuNDYtMS4zMzUtNS40Ni01LjkyNSAwLTEuMzA1LjQ2NS0yLjM4NSAxLjIzLTMuMjI1LS4xMi0uMy0uNTQtMS41My4xMi0zLjE4IDAgMCAxLjAwNS0uMzE1IDMuMyAxLjIzLjk2LS4yNyAxLjk4LS40MDUgMy0uNDA1czIuMDQuMTM1IDMgLjQwNWMyLjI5NS0xLjU2IDMuMy0xLjIzIDMuMy0xLjIzLjY2IDEuNjUuMjQgMi44OC4xMiAzLjE4Ljc2NS44NCAxLjIzIDEuOTA1IDEuMjMgMy4yMjUgMCA0LjYwNS0yLjgwNSA1LjYyNS01LjQ3NSA1LjkyNS40MzUuMzc1LjgxIDEuMDk1LjgxIDIuMjIgMCAxLjYwNS0uMDE1IDIuODk1LS4wMTUgMy4zIDAgLjMxNS4yMjUuNjkuODI1LjU3QTEyLjAyIDEyLjAyIDAgMDAyNCAxMmMwLTYuNjMtNS4zNy0xMi0xMi0xMnoiLz48L3N2Zz4=" width="13" height="13" style="vertical-align:middle;margin-right:5px;" alt="">
                <a href="https://github.com/DanielRakusan" style="color:#6b7280;text-decoration:none;font-size:11px;vertical-align:middle;">GitHub</a>
              </td>
              <td style="border-left:1px solid #1a2a1a;padding-left:12px;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0icmdiKDIwMCwyMTAsMjIwKSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAuNDQ3IDIwLjQ1MmgtMy41NTR2LTUuNTY5YzAtMS4zMjgtLjAyNy0zLjAzNy0xLjg1Mi0zLjAzNy0xLjg1MyAwLTIuMTM2IDEuNDQ1LTIuMTM2IDIuOTM5djUuNjY3SDkuMzUxVjloMy40MTR2MS41NjFoLjA0NmMuNDc3LS45IDEuNjM3LTEuODUgMy4zNy0xLjg1IDMuNjAxIDAgNC4yNjcgMi4zNyA0LjI2NyA1LjQ1NXY2LjI4NnpNNS4zMzcgNy40MzNhMi4wNjIgMi4wNjIgMCAwMS0yLjA2My0yLjA2NSAyLjA2NCAyLjA2NCAwIDExMi4wNjMgMi4wNjV6bTEuNzgyIDEzLjAxOUgzLjU1NVY5aDMuNTY0djExLjQ1MnpNMjIuMjI1IDBIMS43NzFDLjc5MiAwIDAgLjc3NCAwIDEuNzI5djIwLjU0MkMwIDIzLjIyNy43OTIgMjQgMS43NzEgMjRoMjAuNDUxQzIzLjIgMjQgMjQgMjMuMjI3IDI0IDIyLjI3MVYxLjcyOUMyNCAuNzc0IDIzLjIgMCAyMi4yMjIgMGguMDAzeiIvPjwvc3ZnPg==" width="13" height="13" style="vertical-align:middle;margin-right:5px;" alt="">
                <a href="https://linkedin.com/in/daniel-rakusan" style="color:#6b7280;text-decoration:none;font-size:11px;vertical-align:middle;">LinkedIn</a>
              </td>
            </tr>
          </table>
          <!-- Bílý info box (kontrast na tmavém bg) -->
          <table cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#ffffff;border-radius:8px;margin-bottom:18px;">
            <tr>
              <td style="padding:12px 14px;vertical-align:middle;width:42px;">
                <table cellpadding="0" cellspacing="0" border="0"><tr>
                  <td width="34" height="34" style="background:#16a34a;border-radius:8px;width:34px;height:34px;text-align:center;vertical-align:middle;">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNNi43NSA3LjVsMyAyLjI1LTMgMi4yNW00LjUgMGgzbS05IDguMjVoMTMuNUEyLjI1IDIuMjUgMCAwMDIxIDE4VjZhMi4yNSAyLjI1IDAgMDAtMi4yNS0yLjI1SDUuMjVBMi4yNSAyLjI1IDAgMDAzIDZ2MTJhMi4yNSAyLjI1IDAgMDAyLjI1IDIuMjV6IiBzdHJva2U9InJnYigyNTUsMjU1LDI1NSkiLz48L3N2Zz4=" width="20" height="20" style="vertical-align:middle;display:block;margin:7px auto;" alt="">
                  </td>
                </tr></table>
              </td>
              <td style="padding:12px 6px;vertical-align:middle;">
                <div style="font-size:13px;font-weight:700;color:#111827;margin-bottom:3px;">Code. Learn. Build. Share.</div>
                <div style="font-size:12px;color:#6b7280;">Exploring Python, AI and open source.</div>
              </td>
              <td style="padding:12px 14px;vertical-align:middle;text-align:right;white-space:nowrap;">
                <a href="https://danielrakusan.cz" style="color:#16a34a;text-decoration:none;font-size:12px;font-weight:600;">danielrakusan.cz &#x2192;</a>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>` },
];

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid,
} from "recharts";
import {
  LayoutDashboard, FolderKanban, Plus, Download, Save, Search, Trash2,
  Pencil, X, Clock, Layers, DollarSign, FileText, ClipboardCheck, Stamp,
  Briefcase, Database, Upload,
} from "lucide-react";

/* ===================== BRAND ===================== */
const C = {
  navy: "#131C42", slate: "#333B5E", teal: "#008B8B", teal700: "#0A6E6E",
  aqua: "#20B2AA", aquaBright: "#00CED1", lime: "#8ED96D", lime600: "#5DBE4E",
  ink: "#131C42", sub: "#48566F", muted: "#7A879B", paper: "#F4F8F8",
  line: "#E2EAEE", white: "#ffffff",
};
const LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAABuCAIAAABzxcyaAAAAtGVYSWZJSSoACAAAAAYAEgEDAAEAAAABAAAAGgEFAAEAAABWAAAAGwEFAAEAAABeAAAAKAEDAAEAAAACAAAAEwIDAAEAAAABAAAAaYcEAAEAAABmAAAAAAAAAC8ZAQDoAwAALxkBAOgDAAAGAACQBwAEAAAAMDIxMAGRBwAEAAAAAQIDAACgBwAEAAAAMDEwMAGgAwABAAAA//8AAAKgBAABAAAAiAAAAAOgBAABAAAAbgAAAAAAAABHOtTjAAAACXBIWXMAAAsSAAALEgHS3X78AAAZA0lEQVR4nO2dCVwTx/fAt1Zra3+13lLwqgoIyA1yhlMDeCs3qIB4gIqK/kRUFG8rWn+2Wvu31urPo1it1baeFVGpiAaBACEhCZeA3PcRINf83+4CRohWfxASNM9xP2F2Mzv7vvvmvZmd2WBIKQopmLwr0A0ihn/vnLwDYHAqQrHwHcPTi8GIxTiJjJpHmdVJiLCbd4lNLwYjEgthe+35yaV/U55WxyACjAj+vRN4ejUYEWzvllxY9sQqlO7yE2eXADUj3HTeBTa9Hsydkp9XPrXfwfVdl+60PcWP25iM2lq5Xi29HkxMSXRwos1Oru92jldE5vy1T51vFJ8RIgEi27peS+hdALMi0W4H12cb2yOS7bmV7bY6eepRVli5qAARptNLm7VeD+avkvMraLZgMQCGSJ6RbK8w5ozQJzMTK2NIKr2RTa8HE1t2aWG8QSTHsw0MnqBZ28p2X51MPZu9vxk1Eof3Mja9GAzp4QWIf7P4TCjdaVPmnO1s75fwsL1C06mRyQuyG1PJ48UEy14hvRUMoeUXRsBoSIhI8QyFwIzrBZ6mnc0Ojs9m1twN9Nk3S86IiIigtzRrvRUMKUIRbgGkrhtQ1Yns7SsT7SPYrtsk2ECzBtuQFIdjnPDS5gLUS9j0PjDthmJuPguwHP0uet2/97XuQqJ7pb+uTXTZlDlX0m7IoGA9c/p62sz02oeozT8psvQmMCQSMZFArximBR9OnrmOYfphEYfbrSCXx9iXsWxDxswObHZxF4akOlwt/j9EDHrK7zreSHoTGFK2bDvk5r0S4WAmA57LfzzE+huNGO+kpuHEZD8joy8+4n3H2bg5c97L/sZ7LZ16o+Q0ahtnU2TpBWBEotZmh57Kgq2lnbf/0k0AAMN0YUf0b/eAkNOs0C/UZ3zwudGOPcdJ07lTGh32stEAmDX0adeKf0JKMN0o1dW8gUN04YOr19rA4AjUZjEXCDDWU5dPofhPNvXBMO1GHg/2Xis6tUEJRkZCOpWkpIzY+4kCEfqwjw78OWv+ys5gKFODDC0W6pv5jhhPbeQ1wd4bRf9VgpGVkPGXFcV1wcL18PEDjADjuiowSDoYvSm+g0bb85pbkBJMD8gUiu+6jUcRTgJvypRg5C+kxTg4L1mx5iB87POBIXptU6YEI3MBJO3BmLWD34aI7xFOQh22s91CFgdtQUowcpH2vmToxkOg9z1fn4M/f7/5N2zneaxRWozcBJDk5JaoaToNUrPHPjTcFXUGMvl8fBRy5vwVS4K3IiWYHhbSVp4VlmLYpIl6rs5z1mEfG++K+i9kNjTiHRQlGPkICYbJycUGmFjYBVo5LsX6GpJgmgmNK8HIR0gwWTnPsU+MTKz9KVOXY/2UYBRASDDcnELsE0OZgClSgvmfRJZgfELTqDdKT8FegVggx2t8E3lfwMAHsJglNPMrxccQ8aBMwZ9jvidgPCPYrisS7S/nH/m98IcL2YfJGYGKLIoMxtjE2q/rYCBtZs8LS5ofV3YF8h9VXvd8oH2YubZKVIwUeKKzgoLhZOX3GWxmZLkINN4VMNs5Xlsy5+/PCC4V5JHlPyi/siFtxubMedtSfdNq45GiztZUUDClFfUYpgudGCuHpf8zGPIJ5saM2cnV9yBHIMLz48qvrk2h7uT6bmHPX5HocKP0dNsaAcVio1hg2gcuL1+9O2yczUA1u6nTQ/7nDmYrGMbs1Bp8ZoyQiMQIME7bOfjUwDDmjJUpNoeYIWWEPSnUGgFFAQNKaeGTE/LwcX5HZ3/4TJkWoG3siX02pYtg6NVxSBIM3Xkrxz2KEwSBwHam94oUm7CkubTK22RF5KSAjqIoYEjhZBVpGs6FRszbLwwRSjKyWoCPLh88i7oPTCjdOZLjsZXh2YCqGlFVFHPFsiSrbck+YqRAvU75g2lvQL4+Eo31052o56qh5zbPYzUi2n0DCy/gtPfr7gQDPmYH1yecOXcPI7BQwIHA7GLukbAEdyHiy0kHUkT+YEi/Ul5R++Ewk4m6rqBiVXWXkHX45EoCjI8MwICP8drB8VlDpy6Lp8SWXQI2hU0cAWqSnxo6ivzBkPOPS0qrtU1cdUy9TSn+KhOcQzdEIZmBCcV9jNteViCj4WEUM8jroc6J3K114kr56UCKyB8MaTEVlXWaBnMmGXmY2wYOH0ddLVuLoW7nem+gz+HykuEUZ3L3+sbrRz5dhBRpOED+YEiLKa+sUdefo/UCzFdIZmDWgI/h+ERkuoWlzblbfAkyH5b/GZ7gLkAtctNCJ3kfwYCPieR4bWf7hDPmBjyZciJraxOq5aNGvlgJRkLkAmYbhMsZHmn18ecLojweaGxKdmXUPpafDqTI+wkGD5c3MGY8qrmG51RcWf6YsjZ+pkgZLkuKvHzMNrb7ihS701l7wecX8DmHUkOFynBZUuRgMXS8KdvFXvRN1poAmumWJM8SQTbCF0Mpe/4S0vNgyH7MvszARlT9uO5GYLzFSppjbMlv8tOBFHkfwRDD/j5habOuPD8OdlKJCjYnea78mypUhsuSIhcw5LD/smTLvWlL61A5H/GuFZ5SDsm8JPJpythuUdxlV0u+X/aYsizeOq7kKlEXBVrK/L6C4bjvZvnzUG0VKtia4uP9UOske5f8dCBFFBRMcMhuJGMfA/nfctdDOyZE/B84W4PuOyj7MS+JJBhyEHPwaMfIXd8h2Q77e0dmegYnWa+kTU2sjYH8zHpaC+LJTQudRNHAeFnYLx482v6rgz8gWTZlEWzXKM7ylIbYHel+XnE6P2XtUijPjxQWzL4oGYJZiz9a9tyU7lYo4ILDP5W1c0GC7u7UJUrn/5LIAQwxJLOF7botw+NR+U3IvFfxa2jsXCExj0lB5P0Egz9a3s723sCY6Z9gei4vCrqWTaherLQYSel5MG2PlpdkNiQeZq5dmGCwM80/v5mNFGna3/sIhrSYzYz5RDwmvlF02veB3r8T5iofLb8kPQ+GHPaHzv+qJLtLBUegHWPUJex+ukyg9DGSIheLgahsF3dRVNZyv0fGezOXlIqegedXdjBfErn4mAhi+lIDqrxZ8t/AeLNVT6fFlV+Rnw6kyPsIBixmB8d7U8a86LxvoB17xs8IeUwNfuCotJiXRE7OHx/2D01z2k5fVIkKmlDDhaxv+cohGUlpA1P7WjD4K0u6HQxsw1gzV9EcYksvi1vftKko0v1g8OVZbyMCIf6kvbS8RkN/jpaxp4Vd4OAxDvsOHEcSYPYceMlilr4E5v4/gkmpfoDwlcp4S/Wg/Eo7GPKl2ZEcj+Akmx8528mfBnrb1O0KJEX+FkNOka2uadQEizHwMLNd/Pko+91f4e96hcvWN8fB7CbANDXh4ez0ucFtb1/C34l57mKMJJjP1ew6g0knlvSRS8gfVVxb0/YEs21BsxeEzpEpCxRncQySicW0pre66URFJRWm1r56ZgtsqMEqE5zORV8jChNRqEEYpnf+8v328hcv374x4jDxslJtAPPgERP7yHDq9BBTSoCxlZ+qujOvBbcMAswsfGUsc/7jytsC1FIrrBQi/p3Sn9elOkuC2cb23JLpeoAZ3IzqeG+ZGsW1Mpop0J1gyHs/hc76aIA+aBPrZ4B9+IbJEOsHX9GBex/rbwAaxwboq462H/iFDZGpjfXVVxnlMHCE5egvqRimhfXRHaMxHQ4eomLfb5ApfsynJlhfPeJgw+q6eqjG1fwTSxLNwIWAh1+fPHNbmnc43S0i1XMDfeZayMlwWc+QSBkua+nOm+num94mRaR5hsRPS63AHVi3t2ndCYZcgdTULHj4KDUxmZNEz3rDlJjMTcvIy84ry80vz8kvzyusSEnPuR+X8nd8enZuSUFRdRojD//zUdq9+8lMdiEjsyDuYSocGZ+QkUznFhRVZeeWwZ85z8oYjFyBkFj3XJNyq+Dc3eJLd4sv/lV8/mbR2VtEulMUDTnS0i+32o5543T+as6J8ubCbtRhu8jfxyhFqsgEzJsv/+3GdcJyWXMsu5PKJFxGhP8/c/4Pe6eAj1Qp/VVt+6u9SH1GWhmZux/65izxfuRXXhvpsYaNc8Q+NvpsrEOHQvCkaguFWzv6HTv+ixi9sqi2tziKVUbbQpgwZIIT9i+Tz1WsyF5Lh6+QJ83LL8E+08NGWn06yr7DeQeMssOGW2iZuG6OPFz4vPw19e+idDOY9lqOmjQNw/S1jNwnGXpoG3lJJi0jTw19909UKNgAPRb3ORwsFErp2ZE6Ups0XWW8y2QTnw6FtCZjz4mT52H/Mh0+llJWUYck3hQgUU5rlcZoTVedMB0CPzX1GYPGOZDBcQe1kjXJySvpO8hI28hbx1jKSbWMvDT03AaNdoCoJCaWJnmKbhSZgHGZu6LPYHOIdA3MFxhZLoKtvplvezK2WgR9DmuHZUPGTNM0nC35RUkhVaxp7DZRd76ptT98hXwXOZmgy6JvhhcOmZRpy/uPsLKhBqBOP/iDl9P23lMdE3d1PTcL+yUaBu6jJs0QvxrMs4KyQWrWRpZ+Rpb4SQ3MFxKnwxNcC9TfwGLhFEoAZGKYZhNfSjldl+6NylpVgA2eAtcAl2RksVDHxEtlAlVNw0VNw1lN00VlotN47dmklqfYLv5kpFkGC38rRWejIcF8qTt3gs5cE2s/OF7X1FvT0A0K+UKdOlZ75ijN6ZqG7pAPmtIy9tLQn1NRWYs6GU07GC2csSt0YAEPGOJrwOQVlH2uamVosYgEM9nUc4LuHFUN51GaLsO/dBw/eQ7kAyFrx2UQoN++S+tcTtdFJmCGj5+ma+pjau2nbew9UXc2NDIiokUnFbZ4eSQ0JqDNKTYBfQYaJqdmoVeDmaA/b8LkeWaUxVpGHpNNPXhNInFbUfBhgs7Myabe+C1svlBt4jRuVmHnoroCxsTKb+yk2QsCtojbzggStPqrwaMdoRwTa/9PVKx/+z22czldl+4HAxcw/MupAMbcdvEXE6dPmxmMiHUn7Y3MhUsxA1Rs7J1XUKjBn6pYpjNfZzGtYGwXg69S15vD4/GRhE04zw4arzMPwOjjnsMpO7eoc1FdAWNK8R85wcXHL7z1Z2mIl6qcio4BQ7GlBsF5+42wvHrtfudyui4yATOMAAMqGK0x09LBvz3+IQ/YG3UK4gJQ6GjN2eA/nyRlojewGALM7Lp6HpIAYzPND8oxIcCMlg0YuLc8F24g9woE+B329dGLGKZHmRoE9tRbwahpzLR2DOgA5rff7g5RozjPW2s9bdlEvRlk+yMtmpICpr7hJTB2Tv49D+bw95ffKTCgTbhsqZGxVHkFmCYkAcaW6j9euwfAhJF7STCHjl0iwRi/G2DetupSwVRVNyCirSc1OHV6IIAxljEYD9/1RH3Ezc24hzt8DCxG14baBubPXg4G5K97tN+vPbgTS7t1N+H23QTY/nr1bnOLEEm7sA7OX9PAXdvUrcMxFEc/dV3X1qhMfZpswLj4L9sm+ajm5LnbhMUshyAewPxxPU5q/bsoPQMGz6+t5UF3DNw+NsAU30L6bApc4f2H+O/tvt75g4L0zXx0jN3/uBaXmMT66+5j2lPmmehb0JUh+7DQnx83yTk7R8o4QlfAAHINfbf5HuuS6Vn3HjyNT0i9HUOzpS6FEowtF0G43H+k9a9XYjqX03XpOTA8nsDEyseUstjeJdjSYYml/ZKpM1YPVqMw3iBcBgWRfbovJlIHjbKBNHycQ7/hltCCQQcQ4nItY09Ngzki4Ysvviinyx1MbWOPoWPs4aRDx9h9NMxMFe+E+UFl7J1XQZv28HF653K6Lj0Hpq6ON2CkCdZXX11/PlwzND6mlIAPPjdKYeSgfwID8Q85WGA9dbmt0wrYgpVYOSxtGzJZAAryWryNKKfjWv2ug4HbwoYaDOe1pa5wnL7a3nklnHoKVP4z03Ha1NeMn3ZFeg4M/P/l11unz/6xOGinmgbe8weX/uEgk1RGLnoDiyHHrPqNsAIGn6nam1q3ooLMSQau/kE7X6WgLoKBBHEH9rER1s8I+9gY62+MfWSEYZM/HDqFOiu4vlGIpMX6XZcedf6k/PJrTJ+h5rAXLOYNwYCP0TPz1TZ2/8/RX65c+3v9piMD1exMrfwgf6Ca/d4Dp19Tqy76GGjH7JyW/vLbveM/XSbSb8dOXDz9822yBe5cQndJj/ZjWvgQbor+c+R8v+FWbwWGHJLRMnZt4eOZLXykMt5e33wh4ZzdTaw8RK0VkFKrrofLfksipF7vW3XL3lZkDEYdwCyW6Pnjh/3ficsfDrN8OzBt/ZjqmgbyVCHrD/QdbmVhu9iMEoBhWs9LatErbt7u6vmL8d+zE5OJRCLTZ6YyGV0eOQEfXQZtjp00G2KwDocdPX65/0iKBJh/dv4dev4IHwn964N/GZnbLQGjGTmeumf/j0jGYHpYZAJm4ChbAAOBEyQ1dRd337Ajx87uP3ji4H9Ohm/7ZpSmi6EF/rTGzCaw3xDT5FQuegswL6YXQ8sGvUvYBX3PIeMcXnX3KsG8kAFq1prQ9JOBk/nCsZNmfapq96mqLWyHfUkln6GZWvtrm/gMHU2prsangb3VICbhq9AMt7VDxzhCJwZ6M8PGTc1k50sv52Uw5u8nGPI6Y+4lYpiOjoknxLJEP8APOsmtyepFmIth2hG7jiB8XrmUF4WRKh5vMH+i7nxz20Bt/BnlXLIpEwjw5yLXb8YNG+sARVnZL/14pHXgqj3tu14qRwKMup6rhV0gdOZVJ7lIHcFrBzNQ1RrATLEJgO6kV9sgZk+KrOaV3YtLmWQw5yMVy+FfThsy1n6oRBoy1mHAF5QR4+3PReOv02+9c5FYIBIIxHyhSCDGZ+YLya5iv+EW2Cd6apou2GBTbIhhcVkFZLYI8FmpInz6ss6natYjJjhi2KShE2zFRDlAAtwzfIBCoEC+sHXVy0dfWGCDTEdpTu87xKLfZ5bkAWL8YBHp14ViAVlyJqcAwzQHj3FQU3eGLostdZGMtPQakeG8MvjfwGtmsfKSUzLpqVx6KodMycmsqupG4gAhq+FJWs3DZmkLU8hCCgrKsjNLGIwcLqsom1vc4ZjsrCJm2rPSfF5hdnU29/nrO+EMZjYtMSMjIy8+6em1xD9azyJtaitkQSWh2mmMLPgKNysPSTtMpiKfmZikOm4VndlGX7AjMXAHzR9ybuSdOZocfqcwWoBa/sg6WdyER2sC1PSkDpQoTqmLqUEF15+duph75Axnf2rVo7jiq834ryaU/Vn+/Y2yEzxUlVmX9KTsDnzrZt7ZGlFJXkPGD6mRJxm78xpY5EnJ85aj7G9zQypRwZ2CC5BNK7vDqklsQFXRWYeOpWxl1tDkopMOIlswr1kWA3uPpIaff76/AVUmVF7Pakxd92BeQtX1dXGuz4QZ4Q89kqvx5xzPm7iLrlsAqvAH3vdLL5cIskMSqBfyDvNQzZYE76c1sUdZGy/lf3ucGXk+/8Ddkku+sUZNqHYPPZDVRNtBC/w57+Dv+T+eSNmLCE8mIpxZetWjfSnLuC1JHjG6eWIG8Lj2/OTlvO+OMDfefH5mQ5wbfj8Qq3xEErXtYZHFMgzJK3odGG5DyrHM8Ch6CL02jsNL/j4zgo94h1M35AnT99ODyWVg5aL88HgPAeIfpK9JqMRfLxLFCiKZ7aUvzWymfcfaxGlKZjY/Ppv7VWLtndU0p1O5ew4wV+S2pF8vOn06d/f9isuc+mQk8Ut+GTWP96cFAZJ/P51zmLP2x7yt9ysuXsw7cu05PrTTgCpQq6/656sQy+zXAeU5qTy16mEJ4ibW/LWV5pvLzzhID8XBpIVltSR/wwxl85LgmApxQVj8fCHiH6Cv/rv0T8jZlRZAq8Tbq93JgayWJwAmq4WeUh97Ln9/bNnFX/OP/lJw2CNWqwoV5jSlPxdxTnAj9yeGoLY7BuFgnhxIWwlQT7B2JjRc976nm1h3Mzrn0M3i80LUfLPgrCL8kEy3djCJe6ek6dmeh8HfMNYfSQ+Tmo4yNkbRV11iHT+f+XVInPOhjNAfmNurUHHo/dlHmZs2xnnUotLIeP+dSYE/ZuwpFeWEJ3h8w1y/+r5LWhX+i1bhNLeEMtx0tiT4ZtQlnGVH7UsJjkz0u1V65q/iny9lH21GdUvjKIVizvH0yMNpoV+nh94oOcWojb/I+p6sZ1r1o11PAxn18fuerIJbYVOCx92yCzFFFzc/8t2fsmpfUnBWHT06/Qj4p4P01VDbV13IMeamyLiAjPLH6BVBRFek+y2mSdyY2ZCU2ZCY2fCU9YrEbKAV8NgiJCzgs1kNiXzilRQVggJmPa1KiD+FLOZlw9fZ9Ulw84JbZtQ/KRU+I8svas5pFFXDh4J6dgtqAvfDaUzhNqbCkVUtJZV8PHIracmD1g92seppUBnISSi9HVt8pa2G9c+bc/iosbglF/5sEFXWCsuhqctuSIPKCFFLvbDmGY+V08iA+rzqEsiUUU+rEZR1uw7RO7k+5m3XrLYdLAcP/xqRTT/mbRb7Snwm88WdPiOpx0t+6KBcabukF9LhWx2Oea9XLStFqijBKKgowSio/D+CvIkgrzOqlAAAALRlWElmSUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAAAvGQEA6AMAAC8ZAQDoAwAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAAIgAAAADoAQAAQAAAG4AAAAAAAAARzrU4wAAAABJRU5ErkJggg==";

const SERVICE_TYPES = [
  { name: "Plan Review", color: C.teal, icon: FileText },
  { name: "Plan Review + Inspection", color: C.aqua, icon: ClipboardCheck },
  { name: "Permit Expediting", color: C.lime600, icon: Stamp },
  { name: "Contract & Permit Mgmt", color: C.slate, icon: Briefcase },
];
const STATUSES = [
  "Intake", "In Plan Review", "Comments Issued", "Awaiting Resubmittal",
  "Approved", "In Inspections", "Permitting / Expediting", "Closed",
];
const STATUS_COLOR = {
  "Intake": "#7A879B", "In Plan Review": C.teal, "Comments Issued": "#E0843C",
  "Awaiting Resubmittal": "#C0392B", "Approved": C.lime600, "In Inspections": C.aqua,
  "Permitting / Expediting": C.slate, "Closed": "#9AA7B5",
};
const DISCIPLINES = ["Building", "Electrical", "Mechanical", "Plumbing", "Structural", "Roofing", "Gas", "Fire / Life Safety", "Civil / Site"];
const REVIEW_TYPES = ["Plan Review", "Plan Review + Inspection"];
const STORE_KEY = "grip_crm_projects_v1";

/* ===================== HELPERS ===================== */
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const todayISO = () => new Date().toISOString().slice(0, 10);
function daysBetween(a, b) {
  if (!a || !b) return null;
  const d = (new Date(b) - new Date(a)) / 86400000;
  return Number.isFinite(d) ? Math.round(d) : null;
}
const fmtMoney = (n) => "$" + (Number(n) || 0).toLocaleString("en-US");
const fmtDate = (s) => s ? new Date(s + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
const svc = (name) => SERVICE_TYPES.find((s) => s.name === name) || SERVICE_TYPES[0];

/* ===================== STORAGE (persistent) ===================== */
async function loadStore() {
  if (typeof window === "undefined" || !window.storage) return null;
  try {
    const r = await window.storage.get(STORE_KEY);
    return r && r.value ? JSON.parse(r.value) : [];
  } catch (e) { return []; }
}
async function saveStore(list) {
  if (typeof window === "undefined" || !window.storage) return;
  try { await window.storage.set(STORE_KEY, JSON.stringify(list)); } catch (e) {}
}

const SAMPLE = [
  { id: uid(), client: "Pulley Residence", address: "8421 Equestrian Way, Parkland, FL", jurisdiction: "City of Parkland", service: "Plan Review + Inspection", status: "In Plan Review", valuation: 1850000, permits: true, disciplines: ["Building", "Electrical", "Plumbing", "Structural"], received: addDays(-9), completed: "", notes: "Phase 2 new construction. Concierge tier." },
  { id: uid(), client: "Ocean Breeze Roofing", address: "1613 SE Port St Lucie Blvd, Port St. Lucie, FL", jurisdiction: "St. Lucie County", service: "Plan Review", status: "Approved", valuation: 34908, permits: true, disciplines: ["Building", "Roofing"], received: addDays(-12), completed: addDays(-5), notes: "Tile roof replacement. Inspections only follow-on." },
  { id: uid(), client: "Galleria Redevelopment", address: "2nd Ave N, West Palm Beach, FL", jurisdiction: "City of WPB", service: "Permit Expediting", status: "Permitting / Expediting", valuation: 12500000, permits: true, disciplines: ["Building", "Electrical", "Mechanical", "Plumbing", "Fire / Life Safety"], received: addDays(-21), completed: "", notes: "Crescent Heights. Multi-discipline coordination." },
  { id: uid(), client: "Westlake Spec Home", address: "16 Banyan Blvd, Westlake, FL", jurisdiction: "City of Westlake", service: "Plan Review", status: "Comments Issued", valuation: 420000, permits: true, disciplines: ["Building", "Mechanical"], received: addDays(-6), completed: "", notes: "Comments issued day 4. Awaiting resubmittal." },
];
function addDays(n) { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }

/* ===================== APP ===================== */
export default function GRIPCRM() {
  const [projects, setProjects] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState("dashboard");
  const [modal, setModal] = useState(false);
  const [draft, setDraft] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const fileRef = useRef(null);

  useEffect(() => { (async () => { const d = await loadStore(); setProjects(d || []); setLoaded(true); })(); }, []);
  function persist(next) { setProjects(next); saveStore(next); }

  function openAdd() {
    setDraft({ id: uid(), client: "", address: "", jurisdiction: "", service: "Plan Review", status: "Intake", valuation: "", permits: false, disciplines: [], received: todayISO(), completed: "", notes: "", _new: true });
    setModal(true);
  }
  function openEdit(p) { setDraft({ ...p }); setModal(true); }
  function saveDraft() {
    if (!draft.client.trim() || !draft.address.trim()) { alert("Client name and project address are required."); return; }
    const clean = { ...draft }; delete clean._new;
    clean.valuation = Number(clean.valuation) || 0;
    const exists = projects.some((p) => p.id === clean.id);
    persist(exists ? projects.map((p) => (p.id === clean.id ? clean : p)) : [clean, ...projects]);
    setModal(false); setDraft(null);
  }
  function remove(id) { if (confirm("Delete this project?")) persist(projects.filter((p) => p.id !== id)); }
  function toggleDisc(d) {
    const has = draft.disciplines.includes(d);
    setDraft({ ...draft, disciplines: has ? draft.disciplines.filter((x) => x !== d) : [...draft.disciplines, d] });
  }

  /* ---- export / backup / restore ---- */
  function download(name, text, type) {
    const blob = new Blob([text], { type }); const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url);
  }
  function exportCSV() {
    const cols = ["Client", "Project Address", "Jurisdiction", "Service Type", "Status", "Permits Required", "Disciplines", "Valuation", "Date Received", "Date Completed", "Turnaround (days)", "Notes"];
    const rows = projects.map((p) => [p.client, p.address, p.jurisdiction, p.service, p.status, p.permits ? "Yes" : "No", (p.disciplines || []).join("; "), p.valuation, p.received, p.completed, daysBetween(p.received, p.completed) ?? "", (p.notes || "").replace(/\n/g, " ")]);
    const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    download("GRIP-CRM-export.csv", [cols, ...rows].map((r) => r.map(esc).join(",")).join("\n"), "text/csv");
  }
  function backupJSON() { download("GRIP-CRM-backup.json", JSON.stringify(projects, null, 2), "application/json"); }
  function restoreJSON(e) {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => { try { const d = JSON.parse(r.result); if (Array.isArray(d)) { persist(d); alert("Restored " + d.length + " projects."); } } catch (err) { alert("Could not read that file."); } };
    r.readAsText(f); e.target.value = "";
  }

  /* ---- metrics ---- */
  const M = useMemo(() => {
    const active = projects.filter((p) => p.status !== "Closed");
    const reviewDone = projects.filter((p) => REVIEW_TYPES.includes(p.service) && p.received && p.completed);
    const avg = (arr) => arr.length ? Math.round(arr.reduce((s, p) => s + daysBetween(p.received, p.completed), 0) / arr.length) : 0;
    const openReviews = projects.filter((p) => ["In Plan Review", "Comments Issued", "Awaiting Resubmittal"].includes(p.status)).length;
    const pipeline = active.reduce((s, p) => s + (Number(p.valuation) || 0), 0);
    const byType = SERVICE_TYPES.map((t) => {
      const done = projects.filter((p) => p.service === t.name && p.received && p.completed);
      return { name: t.name.replace("Plan Review + Inspection", "PR + Insp.").replace("Contract & Permit Mgmt", "Contract"), full: t.name, color: t.color, count: projects.filter((p) => p.service === t.name).length, turnaround: avg(done) };
    });
    return { activeCount: active.length, avgReview: avg(reviewDone), openReviews, pipeline, byType };
  }, [projects]);

  const filtered = projects.filter((p) => {
    const q = query.toLowerCase();
    const match = !q || p.client.toLowerCase().includes(q) || p.address.toLowerCase().includes(q) || (p.jurisdiction || "").toLowerCase().includes(q);
    return match && (filter === "All" || p.service === filter);
  });

  const font = { fontFamily: "'Spline Sans', system-ui, sans-serif" };
  const serif = { fontFamily: "'Fraunces', Georgia, serif" };

  return (
    <div style={{ ...font, background: C.paper, minHeight: "100vh", color: C.ink }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Spline+Sans:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box}
        input,select,textarea{font-family:'Spline Sans',sans-serif}
        ::-webkit-scrollbar{height:8px;width:8px}::-webkit-scrollbar-thumb{background:#cdd9dd;border-radius:8px}`}</style>

    {/* HEADER */}
<header style={{
  background: C.white,
  borderBottom: `1px solid ${C.line}`,
  position: "sticky",
  top: 0,
  zIndex: 30
}}>
  <div style={{
    maxWidth: 1180,
    margin: "0 auto",
    padding: "12px clamp(12px, 4vw, 22px)",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16
  }}>

    {/* BRAND */}
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 10,
      flex: "1 1 auto",
      minWidth: 220
    }}>
      <img 
        src={LOGO} 
        alt="GRIP Solutions" 
        style={{
          height: "clamp(32px, 6vw, 42px)",
          width: "auto",
          objectFit: "contain"
        }} 
      />

      <div>
        <div style={{
          ...serif,
          fontWeight: 700,
          fontSize: "clamp(16px, 3vw, 18px)",
          color: C.navy,
          lineHeight: 1
        }}>
          GRIP CRM
        </div>

        <div style={{
          fontSize: "clamp(10px, 2vw, 11px)",
          color: C.muted,
          letterSpacing: ".04em"
        }}>
          Project &amp; Performance Tracker
        </div>
      </div>
    </div>


    {/* ACTION BUTTONS */}
    <div style={{
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      justifyContent: "flex-end",
      flex: "0 1 auto"
    }}>
      <Btn onClick={exportCSV} ghost icon={Download}>
        CSV
      </Btn>

      <Btn onClick={backupJSON} ghost icon={Database}>
        Backup
      </Btn>

      <Btn 
        onClick={() => fileRef.current && fileRef.current.click()} 
        ghost 
        icon={Upload}
      >
        Restore
      </Btn>

      <input 
        ref={fileRef}
        type="file"
        accept="application/json"
        onChange={restoreJSON}
        style={{ display:"none" }}
      />

      <Btn onClick={openAdd} icon={Plus}>
        Add Project
      </Btn>
    </div>

  </div>


  {/* TABS */}
  <div style={{
    maxWidth:1180,
    margin:"0 auto",
    padding:"0 clamp(12px, 4vw, 22px)",
    display:"flex",
    gap:4,
    overflowX:"auto"
  }}>
    <Tab 
      active={view === "dashboard"} 
      onClick={() => setView("dashboard")} 
      icon={LayoutDashboard}
    >
      Dashboard
    </Tab>

    <Tab 
      active={view === "projects"} 
      onClick={() => setView("projects")} 
      icon={FolderKanban}
    >
      Projects ({projects.length})
    </Tab>
  </div>

</header>

      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "26px 22px 60px" }}>
        {!loaded && <div style={{ color: C.muted, padding: 40, textAlign: "center" }}>Loading your data…</div>}

        {loaded && view === "dashboard" && (
          <Dashboard M={M} projects={projects} serif={serif} onAdd={openAdd} onSeed={() => persist(SAMPLE)} empty={projects.length === 0} />
        )}

        {loaded && view === "projects" && (
          <Projects {...{ filtered, query, setQuery, filter, setFilter, openAdd, openEdit, remove, serif, empty: projects.length === 0 }} />
        )}
      </main>

      {modal && draft && (
        <Modal draft={draft} setDraft={setDraft} onSave={saveDraft} onClose={() => { setModal(false); setDraft(null); }} toggleDisc={toggleDisc} serif={serif} />
      )}
    </div>
  );
}

/* ===================== DASHBOARD ===================== */
function Dashboard({ M, serif, onAdd, onSeed, empty }) {
  if (empty) return (
    <Empty serif={serif} onAdd={onAdd} onSeed={onSeed} />
  );
  const cards = [
    { label: "Active Projects", value: M.activeCount, icon: FolderKanban, color: C.teal },
    { label: "Avg Plan-Review Turnaround", value: M.avgReview + " days", icon: Clock, color: C.aqua },
    { label: "Open Plan Reviews", value: M.openReviews, icon: FileText, color: C.lime600 },
    { label: "Pipeline Valuation", value: fmtMoney(M.pipeline), icon: DollarSign, color: C.navy },
  ];
  return (
    <div>
      <h2 style={{ ...serif, fontSize: 24, color: C.navy, margin: "0 0 18px" }}>Performance overview</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 16, marginBottom: 22 }}>
        {cards.map((c) => (
          <div key={c.label} style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 16, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ fontSize: 12.5, color: C.sub, fontWeight: 500 }}>{c.label}</div>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: c.color, display: "grid", placeItems: "center", color: "#fff" }}><c.icon size={18} /></div>
            </div>
            <div style={{ ...serif, fontSize: "clamp(22px, 5vw, 30px)", fontWeight: 600, color: C.navy, marginTop: 8 }}>{c.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
        <Panel title="Avg turnaround by service (days)" serif={serif}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={M.byType} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.line} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: C.sub }} />
              <YAxis tick={{ fontSize: 11, fill: C.sub }} />
              <Tooltip cursor={{ fill: "rgba(32,178,170,.08)" }} formatter={(v) => [v + " days", "Turnaround"]} />
              <Bar dataKey="turnaround" radius={[6, 6, 0, 0]}>
                {M.byType.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Projects by service type" serif={serif}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={M.byType} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.line} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: C.sub }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: C.sub }} />
              <Tooltip cursor={{ fill: "rgba(32,178,170,.08)" }} formatter={(v) => [v, "Projects"]} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {M.byType.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>
    </div>
  );
}

/* ===================== PROJECTS ===================== */
function Projects({ filtered, query, setQuery, filter, setFilter, openAdd, openEdit, remove, serif, empty }) {
  if (empty) return <Empty serif={serif} onAdd={openAdd} />;
  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 240px" }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: 11, color: C.muted }} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search client, address, jurisdiction…"
            style={{ width: "100%", padding: "9px 12px 9px 34px", border: `1px solid ${C.line}`, borderRadius: 10, fontSize: 14, background: C.white }} />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: "9px 12px", border: `1px solid ${C.line}`, borderRadius: 10, fontSize: 14, background: C.white, color: C.ink }}>
          <option>All</option>
          {SERVICE_TYPES.map((s) => <option key={s.name}>{s.name}</option>)}
        </select>
      </div>
      <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 880 }}>
            <thead>
              <tr style={{ background: C.navy }}>
                {["Client / Project", "Service", "Permits", "Status", "Received", "Completed", "Turn", ""].map((h) => (
                  <th key={h} style={{ textAlign: "left", color: "#fff", fontSize: 11, letterSpacing: ".05em", textTransform: "uppercase", padding: "12px 14px", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const t = daysBetween(p.received, p.completed);
                return (
                  <tr key={p.id} style={{ borderBottom: `1px solid ${C.line}` }}>
                    <td style={{ padding: "12px 14px" }}>
                      <div style={{ fontWeight: 600, color: C.navy, fontSize: 14 }}>{p.client}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>{p.address}</div>
                    </td>
                    <td style={{ padding: "12px 14px" }}><Badge color={svc(p.service).color}>{p.service}</Badge></td>
                    <td style={{ padding: "12px 14px", maxWidth: 180 }}>
                      {p.permits ? <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>{(p.disciplines || []).map((d) => <Chip key={d}>{d}</Chip>)}{(p.disciplines || []).length === 0 && <span style={{ fontSize: 12, color: C.muted }}>Yes</span>}</div> : <span style={{ fontSize: 12, color: C.muted }}>No</span>}
                    </td>
                    <td style={{ padding: "12px 14px" }}><Badge color={STATUS_COLOR[p.status]}>{p.status}</Badge></td>
                    <td style={{ padding: "12px 14px", fontSize: 13, color: C.sub, whiteSpace: "nowrap" }}>{fmtDate(p.received)}</td>
                    <td style={{ padding: "12px 14px", fontSize: 13, color: C.sub, whiteSpace: "nowrap" }}>{fmtDate(p.completed)}</td>
                    <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 600, color: t == null ? C.muted : C.navy }}>{t == null ? "—" : t + "d"}</td>
                    <td style={{ padding: "12px 14px", whiteSpace: "nowrap" }}>
                      <button onClick={() => openEdit(p)} title="Edit" style={iconBtn}><Pencil size={15} /></button>
                      <button onClick={() => remove(p.id)} title="Delete" style={{ ...iconBtn, color: "#C0392B" }}><Trash2 size={15} /></button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && <tr><td colSpan={8} style={{ padding: 30, textAlign: "center", color: C.muted }}>No matching projects.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ===================== MODAL ===================== */
function Modal({ draft, setDraft, onSave, onClose, toggleDisc, serif }) {
  const set = (k, v) => setDraft({ ...draft, [k]: v });
  const turn = daysBetween(draft.received, draft.completed);
  return (
<div 
  onClick={(e) => e.stopPropagation()} 
  style={{ 
    background: "#fff",
    borderRadius: 18,
    width: "100%",
    maxWidth: 640,
    padding: "clamp(16px, 4vw, 28px)",
    boxShadow: "0 30px 80px -30px rgba(0,0,0,.6)"
  }}
>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ ...serif, fontSize: 22, color: C.navy, margin: 0 }}>{draft._new ? "New project" : "Edit project"}</h3>
          <button onClick={onClose} style={{ ...iconBtn, fontSize: 20 }}><X size={20} /></button>
        </div>
        <div style={{ 
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: 14
}}>
          <Field label="Client name *"><input style={inp} value={draft.client} onChange={(e) => set("client", e.target.value)} /></Field>
          <Field label="Jurisdiction / municipality"><input style={inp} value={draft.jurisdiction} onChange={(e) => set("jurisdiction", e.target.value)} placeholder="City of …" /></Field>
          <Field label="Project address *" span><input style={inp} value={draft.address} onChange={(e) => set("address", e.target.value)} /></Field>
          <Field label="Service type">
            <select style={inp} value={draft.service} onChange={(e) => set("service", e.target.value)}>
              {SERVICE_TYPES.map((s) => <option key={s.name}>{s.name}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select style={inp} value={draft.status} onChange={(e) => set("status", e.target.value)}>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Job valuation ($)"><input style={inp} type="number" value={draft.valuation} onChange={(e) => set("valuation", e.target.value)} placeholder="0" /></Field>
          <Field label="Permits required?">
            <div style={{ display: "flex", gap: 8 }}>
              {["Yes", "No"].map((o) => {
                const on = (o === "Yes") === !!draft.permits;
                return <button key={o} onClick={() => set("permits", o === "Yes")} style={{ flex: 1, padding: "9px 0", borderRadius: 9, border: `1px solid ${on ? C.teal : C.line}`, background: on ? C.teal : "#fff", color: on ? "#fff" : C.sub, fontWeight: 600, cursor: "pointer", fontSize: 14 }}>{o}</button>;
              })}
            </div>
          </Field>
          {draft.permits && (
            <Field label="Permit disciplines" span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {DISCIPLINES.map((d) => {
                  const on = draft.disciplines.includes(d);
                  return <button key={d} onClick={() => toggleDisc(d)} style={{ padding: "6px 11px", borderRadius: 999, border: `1px solid ${on ? C.aqua : C.line}`, background: on ? "rgba(32,178,170,.12)" : "#fff", color: on ? C.teal700 : C.sub, fontWeight: 600, fontSize: 12.5, cursor: "pointer" }}>{d}</button>;
                })}
              </div>
            </Field>
          )}
          <Field label="Date received (incoming)"><input style={inp} type="date" value={draft.received} onChange={(e) => set("received", e.target.value)} /></Field>
          <Field label="Date completed (outgoing)"><input style={inp} type="date" value={draft.completed} onChange={(e) => set("completed", e.target.value)} /></Field>
          <Field label="Notes" span><textarea style={{ ...inp, minHeight: 70, resize: "vertical" }} value={draft.notes} onChange={(e) => set("notes", e.target.value)} /></Field>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
          <div style={{ fontSize: 13, color: C.sub }}>{turn == null ? "Turnaround calculates once both dates are set." : <span>Turnaround: <b style={{ color: C.navy }}>{turn} days</b></span>}</div>
          <div style={{ 
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  justifyContent: "flex-end"
}}>
            <Btn onClick={onClose} ghost>Cancel</Btn>
            <Btn onClick={onSave} icon={Save}>Save project</Btn>
          </div>
        </div>
      </div>
  );
}

/* ===================== SMALL UI ===================== */
function Empty({ serif, onAdd, onSeed }) {
  return (
    <div style={{ background: C.white, border: `1px dashed ${C.line}`, borderRadius: 18, padding: "56px 28px", textAlign: "center" }}>
      <div style={{ width: 56, height: 56, borderRadius: 14, margin: "0 auto 16px", background: `linear-gradient(135deg, ${C.teal}, ${C.lime})`, display: "grid", placeItems: "center", color: "#fff" }}><Layers size={26} /></div>
      <h3 style={{ ...serif, fontSize: 22, color: C.navy, margin: "0 0 6px" }}>Your CRM is ready</h3>
      <p style={{ color: C.sub, maxWidth: 440, margin: "0 auto 20px", fontSize: 14.5 }}>Start tracking plan review, inspection, and permit projects — turnaround times, disciplines, and pipeline all in one place. Your data saves automatically.</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <Btn onClick={onAdd} icon={Plus}>Add your first project</Btn>
        {onSeed && <Btn onClick={onSeed} ghost>Load sample data</Btn>}
      </div>
    </div>
  );
}
function Panel({ title, children, serif }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 16, padding: 18 }}>
      <div style={{ ...serif, fontSize: 15, color: C.navy, fontWeight: 600, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}
function Tab({ active, onClick, icon: Icon, children }) {
  return (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 7, padding: "12px 16px", border: "none", background: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: active ? C.teal : C.muted, borderBottom: `3px solid ${active ? C.teal : "transparent"}`, marginBottom: -1 }}>
      <Icon size={17} />{children}
    </button>
  );
}
function Btn({ onClick, children, ghost, icon: Icon }) {
  return (
    <button 
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        padding: "9px 15px",
        borderRadius: 10,
        cursor: "pointer",
        fontSize: window.innerWidth < 600 ? 12 : 13.5,
        fontWeight: 600,
        fontFamily: "'Spline Sans',sans-serif",
        border: ghost ? `1px solid ${C.line}` : "none",
        background: ghost ? "#fff" : `linear-gradient(135deg, ${C.teal}, ${C.aqua})`,
        color: ghost ? C.sub : "#fff",
        whiteSpace: "nowrap",
      }}
    >
      {Icon && <Icon size={window.innerWidth < 600 ? 14 : 16} />}
      {children}
    </button>
  );
}
function Badge({ color, children }) {
  return <span style={{ display: "inline-block", padding: "4px 9px", borderRadius: 999, background: color, color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: ".02em", whiteSpace: "nowrap" }}>{children}</span>;
}
function Chip({ children }) {
  return <span style={{ display: "inline-block", padding: "2px 7px", borderRadius: 6, background: C.paper, border: `1px solid ${C.line}`, color: C.sub, fontSize: 11, fontWeight: 600 }}>{children}</span>;
}
function Field({ label, span, children }) {
  return (
    <div style={{ gridColumn: span ? "1 / -1" : "auto" }}>
      <label style={{ display: "block", fontSize: 11, letterSpacing: ".07em", textTransform: "uppercase", fontWeight: 600, color: C.teal700, marginBottom: 5 }}>{label}</label>
      {children}
    </div>
  );
}
const inp = { width: "100%", padding: "9px 11px", border: `1px solid ${C.line}`, borderRadius: 9, fontSize: 14, background: C.paper, color: C.ink, outline: "none" };
const iconBtn = { background: "none", border: "none", cursor: "pointer", color: C.sub, padding: 6, borderRadius: 6 };

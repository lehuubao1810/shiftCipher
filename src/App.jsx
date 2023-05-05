import { useState } from 'react'

import './App.css'
import Button from './components/Button'
import InputText from './components/InputText'
import InputShift from './components/InputShift'
import ModalDecrypt from './components/ModalDecrypt'
import CopyToClipboard from './components/CopyToClipboard'

function App() {

  // State
  // Shift Cipher Encryption
  const [shiftEnText, setShiftEnText] = useState('')
  const [shiftEnKey, setShiftEnKey] = useState(0)
  const [shiftEnResult, setShiftEnResult] = useState('')

  // Shift Cipher Decryption
  const [shiftDeText, setShiftDeText] = useState('')
  const [shiftDeKey, setShiftDeKey] = useState(0)
  const [statusDeKey, setStatusDeKey] = useState(true)
  const [shiftDeResult, setShiftDeResult] = useState('')

  const [statusModalDe, setStatusModalDe] = useState(false)

  const [allDeResult, setAllDeResult] = useState(['']) // all result
  const [optDeResult, setOptDeResult] = useState(['']) // optimal result

  // Functions
  // Shift Cipher Encryption
  const handleEncrypt = () => {
    let result = ''
    for (let i = 0; i < shiftEnText.length; i++) {
      let char = shiftEnText.charCodeAt(i)
      result += String.fromCharCode((char - 32 + shiftEnKey) % 95 + 32);
    }
    setShiftEnResult(result)

    console.log(result.charCodeAt(0))
  }
  // Shift Cipher Decryption
  const handleBtnDecrypt = () => {
    if (statusDeKey) {
      handleDecryptKey()
    }
    else {
      setStatusModalDe(true)
      handleDecryptNoKey()
    }
  }
  // Have key
  const handleDecryptKey = () => {
    let result = ''
    for (let i = 0; i < shiftDeText.length; i++) {
      let char = shiftDeText.charCodeAt(i)
      console.log(char)
      let temptResult = char - 32 - shiftDeKey + 95
      if (temptResult < 0) {
        temptResult += 95
      }
      result += String.fromCharCode(temptResult % 95 + 32);
      console.log(shiftDeKey)
    }
    setShiftDeResult(result)
    console.log(result.charCodeAt(0))
  }
  // Don't have key
  const handleDecryptNoKey = () => {
    const all_results = []
    const opt_results = []
    for (let i = 0; i < 95; i++) {
      let result = ''
      for (let j = 0; j < shiftDeText.length; j++) {
        let char = shiftDeText.charCodeAt(j)

        let temptResult = char - 32 - i + 95
        if (temptResult < 0) {
          temptResult += 95
        }
        result += String.fromCharCode(temptResult % 95 + 32);
      }
      all_results.push(
        {
          key: i,
          result: result
        }
      )
      if (isOptimizeResult(result)) {
        opt_results.push(
          {
            key: i,
            result: result
          }
        )
      }

    }
    setAllDeResult(all_results)
    setOptDeResult(opt_results)
  }

  const isOptimizeResult = (result) => {
    // keep only a-eg-ik-vx-yA-EG-IK-VX-Y0-9 .,?@=()%!^&*+#-
    const opt_result = result.replace(/[^a-eg-ik-vx-yA-EG-IK-VX-Y0-9 .,?@=()%!^&*+#-]/g, '');
    // const opt_result = result.replace(/[^a-eg-ik-vx-yA-EG-IK-VX-Y0-9 .,?@]/g, '')
    if (opt_result.length < shiftDeText.length) {
      return false
    }
    else {
      // for (let i = 0; i < result.length - 1; i++) {
      // let char = result[i] + result[i + 1]
      let char = result[0] + result[1]
      if (err2Word.includes(char) || err2Word.includes(char.toLowerCase())) {
        return false
      }
      else {
        return true
      }
      // }
    }
  }

  const handleCheckKey = () => {
    setStatusDeKey(!statusDeKey)
    // console.log(statusDeKey)
  }

  const warnWord = [
    "et", "ci", "by", "dy", "eu", "ey", "ge", "gu", "gy", "ce", "ci", "dy", "hy", "ka", "ko", "ku",
    "ky", "my", "ny", "ou", "oy", "sy"
  ]
  const err2Word = [
    "aa", "ab", "ac", "ad", "ae", "ag", "ah", "ak", "al", "aq", "ar", "as",
    "av", "ax", "bb", "bc", "bd", "bg", "bh", "bk", "bl", "bm", "bn", "bp", "bq", "br",
    "bs", "bt", "bv", "bx", "by", "cb", "cc", "cd", "ce", "cg", "ci", "ck", "cl", "cm", "cn",
    "cp", "cq", "cr", "cs", "ct", "cv", "cx", "cy", "db", "dc", "dd", "dg", "dh", "dk", "dl",
    "dm", "dn", "dp", "dq", "dr", "ds", "dt", "dv", "dx", "dy", "ea", "eb", "ed", "ee", "eg", "eh",
    "ei", "ek", "el", "eq", "er", "es", "et", "eu", "ev", "ex", "ey", "gb", "gc", "gd",
    "ge", "gg", "gk", "gl", "gm", "gn", "gp", "gq", "gr", "gs", "gt", "gv", "gx", "gy",
    "hb", "hc", "hd", "hg", "hh", "hk", "hl", "hm", "hn", "hp", "hq", "hr", "hs", "ht", "hv",
    "hx", "hy", "ib", "id", "ie", "ig", "ih", "ii", "ik", "il", "io", "ip", "iq", "ir", "is",
    "iv", "ix", "iy", "ka", "kb", "kc", "kd", "kg", "kk", "kl", "km", "kn", "ko", "kp",
    "kq", "kr", "ks", "kt", "ku", "kv", "kx", "lb", "lc", "ld", "lg", "lh", "lk", "ll", "lm",
    "ln", "lp", "lq", "lr", "ls", "lt", "lv", "lx", "mb", "mc", "md", "mg", "mh",
    "mk", "ml", "mm", "mn", "mp", "mq", "mr", "ms", "mt", "mv", "mx", "nb", "nc", "nd",
    "nk", "nl", "nm", "nn", "np", "nq", "nr", "ns", "nt", "nv", "nx", "ny", "ob",
    "od", "og", "oh", "ok", "ol", "oq", "or", "os", "ou", "ov", "ox",
    "oy", "pa", "pb", "pc", "pd", "pe", "pg", "pi", "pk", "pl", "pm", "pn", "po", "pp", "pq", "pr", "ps", "pt",
    "pu", "pv", "px", "py", "qa", "qb", "qc", "qd", "qe", "qg", "qh", "qi", "qk", "ql", "qm", "qn", "qo", "qp", "qq",
    "qr", "qs", "qt", "qv", "qx", "qy", "rb", "rc", "rd", "rg", "rh", "rk", "rl", "rm", "rn",
    "rp", "rq", "rr", "rs", "rt", "rv", "rx", "ry", "sb", "sc", "sd", "sg", "sh", "sk",
    "sl", "sm", "sn", "sp", "sq", "sr", "ss", "st", "sv", "sx", "sy", "tb", "tc", "td", "tg",
    "tk", "tl", "tm", "tn", "tp", "tq", "tr", "ts", "tt", "tv", "tx", "ty", "ub",
    "ud", "ug", "uh", "uk", "ul", "up", "uq", "ur", "us", "uv", "ux",
    "vb", "vc", "vd", "vg", "vh", "vk", "vl", "vm", "vn", "vp", "vq", "vr", "vs", "vt",
    "vv", "vx", "vy", "xb", "xc", "xd", "xg", "xh", "xk", "xl", "xm", "xn", "xp", "xq", "xr",
    "xs", "xt", "xv", "xx", "xy", "ya", "yb", "yc", "yd", "yg", "yh", "yi", "yk", "yl", "ym", "yn", "yo",
    "yp", "yq", "yr", "ys", "yt", "yu", "yv", "yx", "yy"
  ]

  return (
    <div className="App">
      <div className="title">SHIFT CIPHER</div>
      <div className="ascii">ASCII</div>
      {
        statusModalDe &&
        <ModalDecrypt
          allDeResult={allDeResult}
          optDeResult={optDeResult}
          setStatusModalDe={setStatusModalDe}
        />
      }
      <div className="main">
        <div className="encrypt col">
          <div className="sub_title">Encrypt</div>
          <InputText
            setValue={setShiftEnText}
            value={shiftEnText}
            placeholder="Enter text to encrypt"
          />
          <div className="btn">
            <InputShift
              setValue={setShiftEnKey}
              value={shiftEnKey}
              disabled={false}
            />
            <Button
              handle={handleEncrypt}
              className="btnEncrypt"
              name="Encrypt"
            />
          </div>
          <div className="result">
            {shiftEnResult}
            <CopyToClipboard text={shiftEnResult} />
          </div>
        </div>
        <div className="line"></div>
        <div className="decrypt col ">
          <div className="sub_title">Decrypt</div>
          <InputText
            setValue={setShiftDeText}
            value={shiftDeText}
            placeholder="Enter text to decrypt"
          />
          <div className="btn">
            <InputShift
              setValue={setShiftDeKey}
              value={shiftDeKey}
              disabled={!statusDeKey}
            />
            <input
              type="checkbox"
              onChange={handleCheckKey}
              className="checkKey"
              checked={statusDeKey}
            ></input>
            <Button
              handle={handleBtnDecrypt}
              className="btnDecrypt"
              name="Decrypt"
            />
          </div>
          <div className="result">
            {shiftDeResult}
            <CopyToClipboard text={shiftDeResult} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

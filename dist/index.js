var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __reflectGet = Reflect.get;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __superGet = (cls, obj, key) => __reflectGet(__getProtoOf(cls), key, obj);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// lib/index.ts
var lib_exports = {};
__export(lib_exports, {
  PlaywrightCommandException: () => PlaywrightCommandException,
  PlaywrightCommandMethodNotSupportedException: () => PlaywrightCommandMethodNotSupportedException,
  Stagehand: () => Stagehand
});
module.exports = __toCommonJS(lib_exports);
var import_sdk2 = require("@browserbasehq/sdk");
var import_test = require("@playwright/test");
var import_crypto2 = require("crypto");
var import_fs2 = __toESM(require("fs"));
var import_os = __toESM(require("os"));
var import_path2 = __toESM(require("path"));

// lib/dom/build/scriptContent.ts
var scriptContent = '(() => {\n  // lib/dom/xpathUtils.ts\n  function getParentElement(node) {\n    return isElementNode(node) ? node.parentElement : node.parentNode;\n  }\n  function getCombinations(attributes, size) {\n    const results = [];\n    function helper(start, combo) {\n      if (combo.length === size) {\n        results.push([...combo]);\n        return;\n      }\n      for (let i = start; i < attributes.length; i++) {\n        combo.push(attributes[i]);\n        helper(i + 1, combo);\n        combo.pop();\n      }\n    }\n    helper(0, []);\n    return results;\n  }\n  function isXPathFirstResultElement(xpath, target) {\n    try {\n      const result = document.evaluate(\n        xpath,\n        document.documentElement,\n        null,\n        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,\n        null\n      );\n      return result.snapshotItem(0) === target;\n    } catch (error) {\n      console.warn(`Invalid XPath expression: ${xpath}`, error);\n      return false;\n    }\n  }\n  function escapeXPathString(value) {\n    if (value.includes("\'")) {\n      if (value.includes(\'"\')) {\n        return "concat(" + value.split(/(\'+)/).map((part) => {\n          if (part === "\'") {\n            return `"\'"`;\n          } else if (part.startsWith("\'") && part.endsWith("\'")) {\n            return `"${part}"`;\n          } else {\n            return `\'${part}\'`;\n          }\n        }).join(",") + ")";\n      } else {\n        return `"${value}"`;\n      }\n    } else {\n      return `\'${value}\'`;\n    }\n  }\n  async function generateXPathsForElement(element) {\n    if (!element) return [];\n    const [complexXPath, standardXPath, idBasedXPath] = await Promise.all([\n      generateComplexXPath(element),\n      generateStandardXPath(element),\n      generatedIdBasedXPath(element)\n    ]);\n    return [standardXPath, ...idBasedXPath ? [idBasedXPath] : [], complexXPath];\n  }\n  async function generateComplexXPath(element) {\n    const parts = [];\n    let currentElement = element;\n    while (currentElement && (isTextNode(currentElement) || isElementNode(currentElement))) {\n      if (isElementNode(currentElement)) {\n        const el = currentElement;\n        let selector = el.tagName.toLowerCase();\n        const attributePriority = [\n          "data-qa",\n          "data-component",\n          "data-role",\n          "role",\n          "aria-role",\n          "type",\n          "name",\n          "aria-label",\n          "placeholder",\n          "title",\n          "alt"\n        ];\n        const attributes = attributePriority.map((attr) => {\n          let value = el.getAttribute(attr);\n          if (attr === "href-full" && value) {\n            value = el.getAttribute("href");\n          }\n          return value ? { attr: attr === "href-full" ? "href" : attr, value } : null;\n        }).filter((attr) => attr !== null);\n        let uniqueSelector = "";\n        for (let i = 1; i <= attributes.length; i++) {\n          const combinations = getCombinations(attributes, i);\n          for (const combo of combinations) {\n            const conditions = combo.map((a) => `@${a.attr}=${escapeXPathString(a.value)}`).join(" and ");\n            const xpath2 = `//${selector}[${conditions}]`;\n            if (isXPathFirstResultElement(xpath2, el)) {\n              uniqueSelector = xpath2;\n              break;\n            }\n          }\n          if (uniqueSelector) break;\n        }\n        if (uniqueSelector) {\n          parts.unshift(uniqueSelector.replace("//", ""));\n          break;\n        } else {\n          const parent = getParentElement(el);\n          if (parent) {\n            const siblings = Array.from(parent.children).filter(\n              (sibling) => sibling.tagName === el.tagName\n            );\n            const index = siblings.indexOf(el) + 1;\n            selector += siblings.length > 1 ? `[${index}]` : "";\n          }\n          parts.unshift(selector);\n        }\n      }\n      currentElement = getParentElement(currentElement);\n    }\n    const xpath = "//" + parts.join("/");\n    return xpath;\n  }\n  async function generateStandardXPath(element) {\n    const parts = [];\n    while (element && (isTextNode(element) || isElementNode(element))) {\n      let index = 0;\n      let hasSameTypeSiblings = false;\n      const siblings = element.parentElement ? Array.from(element.parentElement.childNodes) : [];\n      for (let i = 0; i < siblings.length; i++) {\n        const sibling = siblings[i];\n        if (sibling.nodeType === element.nodeType && sibling.nodeName === element.nodeName) {\n          index = index + 1;\n          hasSameTypeSiblings = true;\n          if (sibling.isSameNode(element)) {\n            break;\n          }\n        }\n      }\n      if (element.nodeName !== "#text") {\n        const tagName = element.nodeName.toLowerCase();\n        const pathIndex = hasSameTypeSiblings ? `[${index}]` : "";\n        parts.unshift(`${tagName}${pathIndex}`);\n      }\n      element = element.parentElement;\n    }\n    return parts.length ? `/${parts.join("/")}` : "";\n  }\n  async function generatedIdBasedXPath(element) {\n    if (isElementNode(element) && element.id) {\n      return `//*[@id=\'${element.id}\']`;\n    }\n    return null;\n  }\n\n  // lib/dom/utils.ts\n  async function waitForDomSettle() {\n    return new Promise((resolve) => {\n      const createTimeout = () => {\n        return setTimeout(() => {\n          resolve();\n        }, 2e3);\n      };\n      let timeout = createTimeout();\n      const observer = new MutationObserver(() => {\n        clearTimeout(timeout);\n        timeout = createTimeout();\n      });\n      observer.observe(window.document.body, { childList: true, subtree: true });\n    });\n  }\n  window.waitForDomSettle = waitForDomSettle;\n  function calculateViewportHeight() {\n    return Math.ceil(window.innerHeight * 0.75);\n  }\n\n  // lib/dom/process.ts\n  function isElementNode(node) {\n    return node.nodeType === Node.ELEMENT_NODE;\n  }\n  function isTextNode(node) {\n    return node.nodeType === Node.TEXT_NODE && Boolean(node.textContent?.trim());\n  }\n  async function processDom(chunksSeen) {\n    const { chunk, chunksArray } = await pickChunk(chunksSeen);\n    const { outputString, selectorMap } = await processElements(chunk);\n    console.log(\n      `Stagehand (Browser Process): Extracted dom elements:\n${outputString}`\n    );\n    return {\n      outputString,\n      selectorMap,\n      chunk,\n      chunks: chunksArray\n    };\n  }\n  async function processAllOfDom() {\n    console.log("Stagehand (Browser Process): Processing all of DOM");\n    const viewportHeight = calculateViewportHeight();\n    const documentHeight = document.documentElement.scrollHeight;\n    const totalChunks = Math.ceil(documentHeight / viewportHeight);\n    let index = 0;\n    const results = [];\n    for (let chunk = 0; chunk < totalChunks; chunk++) {\n      const result = await processElements(chunk, true, index);\n      results.push(result);\n      index += Object.keys(result.selectorMap).length;\n    }\n    await scrollToHeight(0);\n    const allOutputString = results.map((result) => result.outputString).join("");\n    const allSelectorMap = results.reduce(\n      (acc, result) => ({ ...acc, ...result.selectorMap }),\n      {}\n    );\n    console.log(\n      `Stagehand (Browser Process): All dom elements: ${allOutputString}`\n    );\n    return {\n      outputString: allOutputString,\n      selectorMap: allSelectorMap\n    };\n  }\n  async function scrollToHeight(height) {\n    window.scrollTo({ top: height, left: 0, behavior: "smooth" });\n    await new Promise((resolve) => {\n      let scrollEndTimer;\n      const handleScrollEnd = () => {\n        clearTimeout(scrollEndTimer);\n        scrollEndTimer = window.setTimeout(() => {\n          window.removeEventListener("scroll", handleScrollEnd);\n          resolve();\n        }, 100);\n      };\n      window.addEventListener("scroll", handleScrollEnd, { passive: true });\n      handleScrollEnd();\n    });\n  }\n  var xpathCache = /* @__PURE__ */ new Map();\n  async function processElements(chunk, scrollToChunk = true, indexOffset = 0) {\n    console.time("processElements:total");\n    const viewportHeight = calculateViewportHeight();\n    const chunkHeight = viewportHeight * chunk;\n    const maxScrollTop = document.documentElement.scrollHeight - viewportHeight;\n    const offsetTop = Math.min(chunkHeight, maxScrollTop);\n    if (scrollToChunk) {\n      console.time("processElements:scroll");\n      await scrollToHeight(offsetTop);\n      console.timeEnd("processElements:scroll");\n    }\n    const candidateElements = [];\n    const DOMQueue = [...document.body.childNodes];\n    console.log("Stagehand (Browser Process): Generating candidate elements");\n    console.time("processElements:findCandidates");\n    while (DOMQueue.length > 0) {\n      const element = DOMQueue.pop();\n      let shouldAddElement = false;\n      if (element && isElementNode(element)) {\n        const childrenCount = element.childNodes.length;\n        for (let i = childrenCount - 1; i >= 0; i--) {\n          const child = element.childNodes[i];\n          DOMQueue.push(child);\n        }\n        if (isInteractiveElement(element)) {\n          if (isActive(element) && isVisible(element)) {\n            shouldAddElement = true;\n          }\n        }\n        if (isLeafElement(element)) {\n          if (isActive(element) && isVisible(element)) {\n            shouldAddElement = true;\n          }\n        }\n      }\n      if (element && isTextNode(element) && isTextVisible(element)) {\n        shouldAddElement = true;\n      }\n      if (shouldAddElement) {\n        candidateElements.push(element);\n      }\n    }\n    console.timeEnd("processElements:findCandidates");\n    const selectorMap = {};\n    let outputString = "";\n    console.log(\n      `Stagehand (Browser Process): Processing candidate elements: ${candidateElements.length}`\n    );\n    console.time("processElements:processCandidates");\n    console.time("processElements:generateXPaths");\n    const xpathLists = await Promise.all(\n      candidateElements.map(async (element) => {\n        if (xpathCache.has(element)) {\n          return xpathCache.get(element);\n        }\n        const xpaths = await generateXPathsForElement(element);\n        xpathCache.set(element, xpaths);\n        return xpaths;\n      })\n    );\n    console.timeEnd("processElements:generateXPaths");\n    candidateElements.forEach((element, index) => {\n      const xpaths = xpathLists[index];\n      let elementOutput = "";\n      if (isTextNode(element)) {\n        const textContent = element.textContent?.trim();\n        if (textContent) {\n          elementOutput += `${index + indexOffset}:${textContent}\n`;\n        }\n      } else if (isElementNode(element)) {\n        const tagName = element.tagName.toLowerCase();\n        const attributes = collectEssentialAttributes(element);\n        const openingTag = `<${tagName}${attributes ? " " + attributes : ""}>`;\n        const closingTag = `</${tagName}>`;\n        const textContent = element.textContent?.trim() || "";\n        elementOutput += `${index + indexOffset}:${openingTag}${textContent}${closingTag}\n`;\n      }\n      outputString += elementOutput;\n      selectorMap[index + indexOffset] = xpaths;\n    });\n    console.timeEnd("processElements:processCandidates");\n    console.timeEnd("processElements:total");\n    return {\n      outputString,\n      selectorMap\n    };\n  }\n  function collectEssentialAttributes(element) {\n    const essentialAttributes = [\n      "id",\n      "class",\n      "href",\n      "src",\n      "aria-label",\n      "aria-name",\n      "aria-role",\n      "aria-description",\n      "aria-expanded",\n      "aria-haspopup",\n      "type",\n      "value"\n    ];\n    const attrs = essentialAttributes.map((attr) => {\n      const value = element.getAttribute(attr);\n      return value ? `${attr}="${value}"` : "";\n    }).filter((attr) => attr !== "");\n    Array.from(element.attributes).forEach((attr) => {\n      if (attr.name.startsWith("data-")) {\n        attrs.push(`${attr.name}="${attr.value}"`);\n      }\n    });\n    return attrs.join(" ");\n  }\n  window.processDom = processDom;\n  window.processAllOfDom = processAllOfDom;\n  window.processElements = processElements;\n  window.scrollToHeight = scrollToHeight;\n  var leafElementDenyList = ["SVG", "IFRAME", "SCRIPT", "STYLE", "LINK"];\n  var interactiveElementTypes = [\n    "A",\n    "BUTTON",\n    "DETAILS",\n    "EMBED",\n    "INPUT",\n    "LABEL",\n    "MENU",\n    "MENUITEM",\n    "OBJECT",\n    "SELECT",\n    "TEXTAREA",\n    "SUMMARY"\n  ];\n  var interactiveRoles = [\n    "button",\n    "menu",\n    "menuitem",\n    "link",\n    "checkbox",\n    "radio",\n    "slider",\n    "tab",\n    "tabpanel",\n    "textbox",\n    "combobox",\n    "grid",\n    "listbox",\n    "option",\n    "progressbar",\n    "scrollbar",\n    "searchbox",\n    "switch",\n    "tree",\n    "treeitem",\n    "spinbutton",\n    "tooltip"\n  ];\n  var interactiveAriaRoles = ["menu", "menuitem", "button"];\n  var isVisible = (element) => {\n    const rect = element.getBoundingClientRect();\n    if (rect.width === 0 || rect.height === 0 || rect.top < 0 || rect.top > window.innerHeight) {\n      return false;\n    }\n    if (!isTopElement(element, rect)) {\n      return false;\n    }\n    const visible = element.checkVisibility({\n      checkOpacity: true,\n      checkVisibilityCSS: true\n    });\n    return visible;\n  };\n  var isTextVisible = (element) => {\n    const range = document.createRange();\n    range.selectNodeContents(element);\n    const rect = range.getBoundingClientRect();\n    if (rect.width === 0 || rect.height === 0 || rect.top < 0 || rect.top > window.innerHeight) {\n      return false;\n    }\n    const parent = element.parentElement;\n    if (!parent) {\n      return false;\n    }\n    if (!isTopElement(parent, rect)) {\n      return false;\n    }\n    const visible = parent.checkVisibility({\n      checkOpacity: true,\n      checkVisibilityCSS: true\n    });\n    return visible;\n  };\n  function isTopElement(elem, rect) {\n    const points = [\n      { x: rect.left + rect.width * 0.25, y: rect.top + rect.height * 0.25 },\n      { x: rect.left + rect.width * 0.75, y: rect.top + rect.height * 0.25 },\n      { x: rect.left + rect.width * 0.25, y: rect.top + rect.height * 0.75 },\n      { x: rect.left + rect.width * 0.75, y: rect.top + rect.height * 0.75 },\n      { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }\n    ];\n    return points.some((point) => {\n      const topEl = document.elementFromPoint(point.x, point.y);\n      let current = topEl;\n      while (current && current !== document.body) {\n        if (current.isSameNode(elem)) {\n          return true;\n        }\n        current = current.parentElement;\n      }\n      return false;\n    });\n  }\n  var isActive = (element) => {\n    if (element.hasAttribute("disabled") || element.hasAttribute("hidden") || element.getAttribute("aria-disabled") === "true") {\n      return false;\n    }\n    return true;\n  };\n  var isInteractiveElement = (element) => {\n    const elementType = element.tagName;\n    const elementRole = element.getAttribute("role");\n    const elementAriaRole = element.getAttribute("aria-role");\n    return elementType && interactiveElementTypes.includes(elementType) || elementRole && interactiveRoles.includes(elementRole) || elementAriaRole && interactiveAriaRoles.includes(elementAriaRole);\n  };\n  var isLeafElement = (element) => {\n    if (element.textContent === "") {\n      return false;\n    }\n    if (element.childNodes.length === 0) {\n      return !leafElementDenyList.includes(element.tagName);\n    }\n    if (element.childNodes.length === 1 && isTextNode(element.childNodes[0])) {\n      return true;\n    }\n    return false;\n  };\n  async function pickChunk(chunksSeen) {\n    const viewportHeight = calculateViewportHeight();\n    const documentHeight = document.documentElement.scrollHeight;\n    const chunks = Math.ceil(documentHeight / viewportHeight);\n    const chunksArray = Array.from({ length: chunks }, (_, i) => i);\n    const chunksRemaining = chunksArray.filter((chunk2) => {\n      return !chunksSeen.includes(chunk2);\n    });\n    const currentScrollPosition = window.scrollY;\n    const closestChunk = chunksRemaining.reduce((closest, current) => {\n      const currentChunkTop = viewportHeight * current;\n      const closestChunkTop = viewportHeight * closest;\n      return Math.abs(currentScrollPosition - currentChunkTop) < Math.abs(currentScrollPosition - closestChunkTop) ? current : closest;\n    }, chunksRemaining[0]);\n    const chunk = closestChunk;\n    if (chunk === void 0) {\n      throw new Error(`No chunks remaining to check: ${chunksRemaining}`);\n    }\n    return {\n      chunk,\n      chunksArray\n    };\n  }\n\n  // lib/dom/debug.ts\n  async function debugDom() {\n    window.chunkNumber = 0;\n    const { selectorMap: multiSelectorMap, outputString } = await window.processElements(window.chunkNumber);\n    const selectorMap = multiSelectorMapToSelectorMap(multiSelectorMap);\n    drawChunk(selectorMap);\n    setupChunkNav();\n  }\n  function multiSelectorMapToSelectorMap(multiSelectorMap) {\n    return Object.fromEntries(\n      Object.entries(multiSelectorMap).map(([key, selectors]) => [\n        Number(key),\n        selectors[0]\n      ])\n    );\n  }\n  function drawChunk(selectorMap) {\n    if (!window.showChunks) return;\n    cleanupMarkers();\n    Object.entries(selectorMap).forEach(([_index, selector]) => {\n      const element = document.evaluate(\n        selector,\n        document,\n        null,\n        XPathResult.FIRST_ORDERED_NODE_TYPE,\n        null\n      ).singleNodeValue;\n      if (element) {\n        let rect;\n        if (element.nodeType === Node.ELEMENT_NODE) {\n          rect = element.getBoundingClientRect();\n        } else {\n          const range = document.createRange();\n          range.selectNodeContents(element);\n          rect = range.getBoundingClientRect();\n        }\n        const color = "grey";\n        const overlay = document.createElement("div");\n        overlay.style.position = "absolute";\n        overlay.style.left = `${rect.left + window.scrollX}px`;\n        overlay.style.top = `${rect.top + window.scrollY}px`;\n        overlay.style.padding = "2px";\n        overlay.style.width = `${rect.width}px`;\n        overlay.style.height = `${rect.height}px`;\n        overlay.style.backgroundColor = color;\n        overlay.className = "stagehand-marker";\n        overlay.style.opacity = "0.3";\n        overlay.style.zIndex = "1000000000";\n        overlay.style.border = "1px solid";\n        overlay.style.pointerEvents = "none";\n        document.body.appendChild(overlay);\n      }\n    });\n  }\n  async function cleanupDebug() {\n    cleanupMarkers();\n    cleanupNav();\n  }\n  function cleanupMarkers() {\n    const markers = document.querySelectorAll(".stagehand-marker");\n    markers.forEach((marker) => {\n      marker.remove();\n    });\n  }\n  function cleanupNav() {\n    const stagehandNavElements = document.querySelectorAll(".stagehand-nav");\n    stagehandNavElements.forEach((element) => {\n      element.remove();\n    });\n  }\n  function setupChunkNav() {\n    const viewportHeight = calculateViewportHeight();\n    const documentHeight = document.documentElement.scrollHeight;\n    const totalChunks = Math.ceil(documentHeight / viewportHeight);\n    if (window.chunkNumber > 0) {\n      const prevChunkButton = document.createElement("button");\n      prevChunkButton.className = "stagehand-nav";\n      prevChunkButton.textContent = "Previous";\n      prevChunkButton.style.marginLeft = "50px";\n      prevChunkButton.style.position = "fixed";\n      prevChunkButton.style.bottom = "10px";\n      prevChunkButton.style.left = "50%";\n      prevChunkButton.style.transform = "translateX(-50%)";\n      prevChunkButton.style.zIndex = "1000000000";\n      prevChunkButton.onclick = async () => {\n        cleanupMarkers();\n        cleanupNav();\n        window.chunkNumber -= 1;\n        window.scrollTo(0, window.chunkNumber * viewportHeight);\n        await window.waitForDomSettle();\n        const { selectorMap: multiSelectorMap } = await window.processElements(\n          window.chunkNumber\n        );\n        const selectorMap = multiSelectorMapToSelectorMap(multiSelectorMap);\n        drawChunk(selectorMap);\n        setupChunkNav();\n      };\n      document.body.appendChild(prevChunkButton);\n    }\n    if (totalChunks > window.chunkNumber) {\n      const nextChunkButton = document.createElement("button");\n      nextChunkButton.className = "stagehand-nav";\n      nextChunkButton.textContent = "Next";\n      nextChunkButton.style.marginRight = "50px";\n      nextChunkButton.style.position = "fixed";\n      nextChunkButton.style.bottom = "10px";\n      nextChunkButton.style.right = "50%";\n      nextChunkButton.style.transform = "translateX(50%)";\n      nextChunkButton.style.zIndex = "1000000000";\n      nextChunkButton.onclick = async () => {\n        cleanupMarkers();\n        cleanupNav();\n        window.chunkNumber += 1;\n        window.scrollTo(0, window.chunkNumber * viewportHeight);\n        await window.waitForDomSettle();\n        const { selectorMap: multiSelectorMap } = await window.processElements(\n          window.chunkNumber\n        );\n        const selectorMap = multiSelectorMapToSelectorMap(multiSelectorMap);\n        drawChunk(selectorMap);\n        setupChunkNav();\n      };\n      document.body.appendChild(nextChunkButton);\n    }\n  }\n  window.debugDom = debugDom;\n  window.cleanupDebug = cleanupDebug;\n})();\n';

// lib/vision.ts
var import_child_process = require("child_process");
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_sharp = __toESM(require("sharp"));

// lib/utils.ts
var import_crypto = __toESM(require("crypto"));
function generateId(operation) {
  return import_crypto.default.createHash("sha256").update(operation).digest("hex");
}
function logLineToString(logLine) {
  var _a;
  const timestamp = logLine.timestamp || (/* @__PURE__ */ new Date()).toISOString();
  if ((_a = logLine.auxiliary) == null ? void 0 : _a.error) {
    return `${timestamp}::[stagehand:${logLine.category}] ${logLine.message}
 ${logLine.auxiliary.error.value}
 ${logLine.auxiliary.trace.value}`;
  }
  return `${timestamp}::[stagehand:${logLine.category}] ${logLine.message} ${logLine.auxiliary ? JSON.stringify(logLine.auxiliary) : ""}`;
}

// lib/vision.ts
var ScreenshotService = class {
  constructor(page, selectorMap, verbose, externalLogger, isDebugEnabled = false) {
    this.annotationBoxes = [];
    this.numberPositions = [];
    this.page = page;
    this.selectorMap = selectorMap;
    this.isDebugEnabled = isDebugEnabled;
    this.verbose = verbose;
    this.externalLogger = externalLogger;
  }
  log(logLine) {
    if (this.verbose >= logLine.level) {
      console.log(logLineToString(logLine));
    }
    if (this.externalLogger) {
      this.externalLogger(logLine);
    }
  }
  getScreenshot(fullpage = true, quality) {
    return __async(this, null, function* () {
      if (quality && (quality < 0 || quality > 100)) {
        throw new Error("quality must be between 0 and 100");
      }
      return yield this.page.screenshot({
        fullPage: fullpage,
        quality,
        type: "jpeg"
      });
    });
  }
  getScreenshotPixelCount(screenshot) {
    return __async(this, null, function* () {
      var _a, _b, _c, _d;
      const image = (0, import_sharp.default)(screenshot);
      const metadata = yield image.metadata();
      if (!metadata.width || !metadata.height) {
        this.log({
          category: "screenshotService",
          message: "Unable to determine image dimensions.",
          level: 0,
          auxiliary: {
            width: {
              value: (_b = (_a = metadata.width) == null ? void 0 : _a.toString()) != null ? _b : "undefined",
              type: "string"
              // might be undefined
            },
            height: {
              value: (_d = (_c = metadata.height) == null ? void 0 : _c.toString()) != null ? _d : "undefined",
              type: "string"
              // might be undefined
            }
          }
        });
        throw new Error("Unable to determine image dimensions.");
      }
      const pixelCount = metadata.width * metadata.height;
      this.log({
        category: "screenshotService",
        message: "got screenshot pixel count",
        level: 1,
        auxiliary: {
          pixelCount: {
            value: pixelCount.toString(),
            type: "integer"
          }
        }
      });
      return pixelCount;
    });
  }
  getAnnotatedScreenshot(fullpage) {
    return __async(this, null, function* () {
      this.annotationBoxes = [];
      this.numberPositions = [];
      const screenshot = yield this.getScreenshot(fullpage);
      const image = (0, import_sharp.default)(screenshot);
      const { width, height } = yield image.metadata();
      this.log({
        category: "screenshotService",
        message: "annotating screenshot",
        level: 2,
        auxiliary: {
          selectorMap: {
            value: JSON.stringify(this.selectorMap),
            type: "object"
          }
        }
      });
      const svgAnnotations = yield Promise.all(
        Object.entries(this.selectorMap).map(
          (_0) => __async(this, [_0], function* ([id, selectors]) {
            return this.createElementAnnotation(id, selectors);
          })
        )
      );
      const scrollPosition = yield this.page.evaluate(() => {
        return {
          scrollX: window.scrollX,
          scrollY: window.scrollY
        };
      });
      const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" style="position:absolute;left:${-scrollPosition.scrollX}px;top:${-scrollPosition.scrollY}px;">
        ${svgAnnotations.join("")}
      </svg>
    `;
      const annotatedScreenshot = yield image.composite([{ input: Buffer.from(svg), top: 0, left: 0 }]).toBuffer();
      if (this.isDebugEnabled) {
        yield this.saveAndOpenScreenshot(annotatedScreenshot);
      }
      return annotatedScreenshot;
    });
  }
  createElementAnnotation(id, selectors) {
    return __async(this, null, function* () {
      try {
        let element = null;
        const selectorPromises = selectors.map(
          (selector) => __async(this, null, function* () {
            try {
              element = yield this.page.locator(`xpath=${selector}`).first();
              const box2 = yield element.boundingBox({ timeout: 5e3 });
              return box2;
            } catch (e) {
              return null;
            }
          })
        );
        const boxes = yield Promise.all(selectorPromises);
        const box = boxes.find((b) => b !== null);
        if (!box) {
          throw new Error(`Unable to create annotation for element ${id}`);
        }
        const scrollPosition = yield this.page.evaluate(() => ({
          scrollX: window.scrollX,
          scrollY: window.scrollY
        }));
        const adjustedBox = {
          x: box.x + scrollPosition.scrollX,
          y: box.y + scrollPosition.scrollY,
          width: box.width,
          height: box.height,
          id
        };
        this.annotationBoxes.push(adjustedBox);
        const numberPosition = this.findNonOverlappingNumberPosition(adjustedBox);
        const circleRadius = 12;
        return `
        <rect x="${adjustedBox.x}" y="${adjustedBox.y}" width="${adjustedBox.width}" height="${adjustedBox.height}" 
              fill="none" stroke="red" stroke-width="2" />
        <circle cx="${numberPosition.x}" cy="${numberPosition.y}" r="${circleRadius}" fill="white" stroke="red" stroke-width="2" />
        <text x="${numberPosition.x}" y="${numberPosition.y}" fill="red" font-size="16" font-weight="bold" 
              text-anchor="middle" dominant-baseline="central">
          ${id}
        </text>
      `;
      } catch (error) {
        this.log({
          category: "screenshotService",
          message: "warning: failed to create annotation for element",
          level: 1,
          auxiliary: {
            element_id: {
              value: id,
              type: "string"
            },
            error: {
              value: error.message,
              type: "string"
            },
            trace: {
              value: error.stack,
              type: "string"
            }
          }
        });
        return "";
      }
    });
  }
  findNonOverlappingNumberPosition(box) {
    const circleRadius = 12;
    let position = {
      x: box.x - circleRadius,
      y: box.y - circleRadius
    };
    let attempts = 0;
    const maxAttempts = 10;
    const offset = 5;
    while (this.isNumberOverlapping(position) && attempts < maxAttempts) {
      position.y += offset;
      attempts++;
    }
    this.numberPositions.push(position);
    return position;
  }
  isNumberOverlapping(position) {
    const circleRadius = 12;
    return this.numberPositions.some(
      (existingPosition) => Math.sqrt(
        Math.pow(position.x - existingPosition.x, 2) + Math.pow(position.y - existingPosition.y, 2)
      ) < circleRadius * 2
    );
  }
  saveAndOpenScreenshot(screenshot) {
    return __async(this, null, function* () {
      const screenshotDir = import_path.default.join(process.cwd(), "screenshots");
      if (!import_fs.default.existsSync(screenshotDir)) {
        import_fs.default.mkdirSync(screenshotDir);
      }
      const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
      const filename = import_path.default.join(screenshotDir, `screenshot-${timestamp}.png`);
      import_fs.default.writeFileSync(filename, screenshot);
      this.log({
        category: "screenshotService",
        message: "screenshot saved",
        level: 1,
        auxiliary: {
          filename: {
            value: filename,
            type: "string"
          }
        }
      });
      if (process.platform === "win32") {
        (0, import_child_process.exec)(`start ${filename}`);
      } else if (process.platform === "darwin") {
        (0, import_child_process.exec)(`open ${filename}`);
      } else {
        (0, import_child_process.exec)(`xdg-open ${filename}`);
      }
    });
  }
};

// lib/prompt.ts
var actSystemPrompt = `
# Instructions
You are a browser automation assistant. Your job is to accomplish the user's goal across multiple model calls by running playwright commands.

## Input
You will receive:
1. the user's overall goal
2. the steps that you've taken so far
3. a list of active DOM elements in this chunk to consider to get closer to the goal. 
4. Optionally, a list of variable names that the user has provided that you may use to accomplish the goal. To use the variables, you must use the special <|VARIABLE_NAME|> syntax.


## Your Goal / Specification
You have 2 tools that you can call: doAction, and skipSection. Do action only performs Playwright actions. Do exactly what the user's goal is. Do not perform any other actions or exceed the scope of the goal.
If the user's goal will be accomplished after running the playwright action, set completed to true. Better to have completed set to true if your are not sure.

Note: If there is a popup on the page for cookies or advertising that has nothing to do with the goal, try to close it first before proceeding. As this can block the goal from being completed.

Again, if the user's goal will be accomplished after running the playwright action, set completed to true.
`;
var verifyActCompletionSystemPrompt = `
You are a browser automation assistant. The job has given you a goal and a list of steps that have been taken so far. Your job is to determine if the user's goal has been completed based on the provided information.

# Input
You will receive:
1. The user's goal: A clear description of what the user wants to achieve.
2. Steps taken so far: A list of actions that have been performed up to this point.
3. An image of the current page

# Your Task
Analyze the provided information to determine if the user's goal has been fully completed.

# Output
Return a boolean value:
- true: If the goal has been definitively completed based on the steps taken and the current page.
- false: If the goal has not been completed or if there's any uncertainty about its completion.

# Important Considerations
- False positives are okay. False negatives are not okay.
- Look for evidence of errors on the page or something having gone wrong in completing the goal. If one does not exist, return true.
`;
function buildVerifyActCompletionSystemPrompt() {
  return {
    role: "system",
    content: verifyActCompletionSystemPrompt
  };
}
function buildVerifyActCompletionUserPrompt(goal, steps = "None", domElements) {
  let actUserPrompt = `
# My Goal
${goal}

# Steps You've Taken So Far
${steps}
`;
  if (domElements) {
    actUserPrompt += `
# Active DOM Elements on the current page
${domElements}
`;
  }
  return {
    role: "user",
    content: actUserPrompt
  };
}
function buildActSystemPrompt() {
  return {
    role: "system",
    content: actSystemPrompt
  };
}
function buildActUserPrompt(action, steps = "None", domElements, variables) {
  let actUserPrompt = `
# My Goal
${action}

# Steps You've Taken So Far
${steps}

# Current Active Dom Elements
${domElements}
`;
  if (variables && Object.keys(variables).length > 0) {
    actUserPrompt += `
# Variables
${Object.entries(variables).map(([key, value]) => `<|${key.toUpperCase()}|>`).join("\n")}
`;
  }
  return {
    role: "user",
    content: actUserPrompt
  };
}
var actTools = [
  {
    type: "function",
    function: {
      name: "doAction",
      description: "execute the next playwright step that directly accomplishes the goal",
      parameters: {
        type: "object",
        required: ["method", "element", "args", "step", "completed"],
        properties: {
          method: {
            type: "string",
            description: "The playwright function to call."
          },
          element: {
            type: "number",
            description: "The element number to act on"
          },
          args: {
            type: "array",
            description: "The required arguments",
            items: {
              type: "string",
              description: "The argument to pass to the function"
            }
          },
          step: {
            type: "string",
            description: "human readable description of the step that is taken in the past tense. Please be very detailed."
          },
          why: {
            type: "string",
            description: "why is this step taken? how does it advance the goal?"
          },
          completed: {
            type: "boolean",
            description: "true if the goal should be accomplished after this step"
          }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "skipSection",
      description: "skips this area of the webpage because the current goal cannot be accomplished here",
      parameters: {
        type: "object",
        properties: {
          reason: {
            type: "string",
            description: "reason that no action is taken"
          }
        }
      }
    }
  }
];
var extractSystemPrompt = `You are extracting content on behalf of a user. You will be given:
1. An instruction
2. A list of DOM elements to extract from

Print the exact text from the DOM elements with all symbols, characters, and endlines as is.
Print null or an empty string if no new information is found.

ONLY print the content using the print_extracted_data tool provided.
ONLY print the content using the print_extracted_data tool provided.
`;
function buildExtractSystemPrompt() {
  const content = extractSystemPrompt.replace(/\s+/g, " ");
  return {
    role: "system",
    content
  };
}
function buildExtractUserPrompt(instruction, domElements) {
  return {
    role: "user",
    content: `Instruction: ${instruction}
DOM: ${domElements}

ONLY print the content using the print_extracted_data tool provided.
ONLY print the content using the print_extracted_data tool provided.`
  };
}
var refineSystemPrompt = `You are tasked with refining and filtering information for the final output based on newly extracted and previously extracted content. Your responsibilities are:
1. Remove exact duplicates for elements in arrays and objects.
2. For text fields, append or update relevant text if the new content is an extension, replacement, or continuation.
3. For non-text fields (e.g., numbers, booleans), update with new values if they differ.
4. Add any completely new fields or objects.

Return the updated content that includes both the previous content and the new, non-duplicate, or extended information.`;
function buildRefineSystemPrompt() {
  return {
    role: "system",
    content: refineSystemPrompt
  };
}
function buildRefineUserPrompt(instruction, previouslyExtractedContent, newlyExtractedContent) {
  return {
    role: "user",
    content: `Instruction: ${instruction}
Previously extracted content: ${JSON.stringify(previouslyExtractedContent, null, 2)}
Newly extracted content: ${JSON.stringify(newlyExtractedContent, null, 2)}
Refined content:`
  };
}
var metadataSystemPrompt = `You are an AI assistant tasked with evaluating the progress and completion status of an extraction task.
Analyze the extraction response and determine if the task is completed or if more information is needed.

Strictly abide by the following criteria:
1. Once the instruction has been satisfied by the current extraction response, ALWAYS set completion status to true and stop processing, regardless of remaining chunks.
2. Only set completion status to false if BOTH of these conditions are true:
   - The instruction has not been satisfied yet
   - There are still chunks left to process (chunksTotal > chunksSeen)`;
function buildMetadataSystemPrompt() {
  return {
    role: "system",
    content: metadataSystemPrompt
  };
}
function buildMetadataPrompt(instruction, extractionResponse, chunksSeen, chunksTotal) {
  return {
    role: "user",
    content: `Instruction: ${instruction}
Extracted content: ${JSON.stringify(extractionResponse, null, 2)}
chunksSeen: ${chunksSeen}
chunksTotal: ${chunksTotal}`
  };
}
var observeSystemPrompt = `
You are helping the user automate the browser by finding elements based on what the user wants to observe in the page.
You will be given:
1. a instruction of elements to observe
2. a numbered list of possible elements or an annotated image of the page

Return an array of elements that match the instruction.
`;
function buildObserveSystemPrompt() {
  const content = observeSystemPrompt.replace(/\s+/g, " ");
  return {
    role: "system",
    content
  };
}
function buildObserveUserMessage(instruction, domElements) {
  return {
    role: "user",
    content: `instruction: ${instruction}
DOM: ${domElements}`
  };
}

// lib/inference.ts
var import_zod = require("zod");

// lib/llm/LLMClient.ts
var modelsWithVision = [
  "gpt-4o",
  "gpt-4o-mini",
  "claude-3-5-sonnet-latest",
  "claude-3-5-sonnet-20240620",
  "claude-3-5-sonnet-20241022",
  "gpt-4o-2024-08-06"
];
var AnnotatedScreenshotText = "This is a screenshot of the current page state with the elements annotated on it. Each element id is annotated with a number to the top left of it. Duplicate annotations at the same location are under each other vertically.";
var LLMClient = class {
  constructor(modelName) {
    this.modelName = modelName;
    this.hasVision = modelsWithVision.includes(modelName);
  }
};

// lib/inference.ts
function verifyActCompletion(_0) {
  return __async(this, arguments, function* ({
    goal,
    steps,
    llmClient,
    screenshot,
    domElements,
    logger,
    requestId
  }) {
    const messages = [
      buildVerifyActCompletionSystemPrompt(),
      buildVerifyActCompletionUserPrompt(goal, steps, domElements)
    ];
    const response = yield llmClient.createChatCompletion({
      messages,
      temperature: 0.1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      image: screenshot ? {
        buffer: screenshot,
        description: "This is a screenshot of the whole visible page."
      } : void 0,
      response_model: {
        name: "Verification",
        schema: import_zod.z.object({
          completed: import_zod.z.boolean().describe("true if the goal is accomplished")
        })
      },
      requestId
    });
    if (!response || typeof response !== "object") {
      logger({
        category: "VerifyAct",
        message: "Unexpected response format: " + JSON.stringify(response)
      });
      return false;
    }
    if (response.completed === void 0) {
      logger({
        category: "VerifyAct",
        message: "Missing 'completed' field in response"
      });
      return false;
    }
    return response.completed;
  });
}
function fillInVariables(text, variables) {
  let processedText = text;
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = `<|${key.toUpperCase()}|>`;
    processedText = processedText.replace(placeholder, value);
  });
  return processedText;
}
function act(_0) {
  return __async(this, arguments, function* ({
    action,
    domElements,
    steps,
    llmClient,
    screenshot,
    retries = 0,
    logger,
    requestId,
    variables
  }) {
    const messages = [
      buildActSystemPrompt(),
      buildActUserPrompt(action, steps, domElements, variables)
    ];
    const response = yield llmClient.createChatCompletion({
      messages,
      temperature: 0.1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      tool_choice: "auto",
      tools: actTools,
      image: screenshot ? { buffer: screenshot, description: AnnotatedScreenshotText } : void 0,
      requestId
    });
    const toolCalls = response.choices[0].message.tool_calls;
    if (toolCalls && toolCalls.length > 0) {
      if (toolCalls[0].function.name === "skipSection") {
        return null;
      }
      return JSON.parse(toolCalls[0].function.arguments);
    } else {
      if (retries >= 2) {
        logger({
          category: "Act",
          message: "No tool calls found in response"
        });
        return null;
      }
      return act({
        action,
        domElements,
        steps,
        llmClient,
        retries: retries + 1,
        logger,
        requestId
      });
    }
  });
}
function extract(_0) {
  return __async(this, arguments, function* ({
    instruction,
    progress,
    previouslyExtractedContent,
    domElements,
    schema,
    llmClient,
    chunksSeen,
    chunksTotal,
    requestId
  }) {
    const extractionResponse = yield llmClient.createChatCompletion({
      messages: [
        buildExtractSystemPrompt(),
        buildExtractUserPrompt(instruction, domElements)
      ],
      response_model: {
        schema,
        name: "Extraction"
      },
      temperature: 0.1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      requestId
    });
    const refinedResponse = yield llmClient.createChatCompletion({
      messages: [
        buildRefineSystemPrompt(),
        buildRefineUserPrompt(
          instruction,
          previouslyExtractedContent,
          extractionResponse
        )
      ],
      response_model: {
        schema,
        name: "RefinedExtraction"
      },
      temperature: 0.1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      requestId
    });
    const metadataSchema = import_zod.z.object({
      progress: import_zod.z.string().describe(
        "progress of what has been extracted so far, as concise as possible"
      ),
      completed: import_zod.z.boolean().describe(
        "true if the goal is now accomplished. Use this conservatively, only when you are sure that the goal has been completed."
      )
    });
    const metadataResponse = yield llmClient.createChatCompletion({
      messages: [
        buildMetadataSystemPrompt(),
        buildMetadataPrompt(
          instruction,
          refinedResponse,
          chunksSeen,
          chunksTotal
        )
      ],
      response_model: {
        name: "Metadata",
        schema: metadataSchema
      },
      temperature: 0.1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      requestId
    });
    refinedResponse.metadata = metadataResponse;
    return refinedResponse;
  });
}
function observe(_0) {
  return __async(this, arguments, function* ({
    instruction,
    domElements,
    llmClient,
    image,
    requestId
  }) {
    const observeSchema = import_zod.z.object({
      elements: import_zod.z.array(
        import_zod.z.object({
          elementId: import_zod.z.number().describe("the number of the element"),
          description: import_zod.z.string().describe(
            "a description of the element and what it is relevant for"
          )
        })
      ).describe("an array of elements that match the instruction")
    });
    const observationResponse = yield llmClient.createChatCompletion({
      messages: [
        buildObserveSystemPrompt(),
        buildObserveUserMessage(instruction, domElements)
      ],
      image: image ? { buffer: image, description: AnnotatedScreenshotText } : void 0,
      response_model: {
        schema: observeSchema,
        name: "Observation"
      },
      temperature: 0.1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      requestId
    });
    if (!observationResponse) {
      throw new Error("no response when finding a selector");
    }
    return observationResponse;
  });
}

// lib/cache/BaseCache.ts
var fs2 = __toESM(require("fs"));
var path2 = __toESM(require("path"));
var crypto2 = __toESM(require("crypto"));
var BaseCache = class {
  constructor(logger, cacheDir = path2.join(process.cwd(), "tmp", ".cache"), cacheFile = "cache.json") {
    this.CACHE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1e3;
    // 1 week in milliseconds
    this.CLEANUP_PROBABILITY = 0.01;
    this.LOCK_TIMEOUT_MS = 1e3;
    this.lockAcquired = false;
    this.lockAcquireFailures = 0;
    // Added for request ID tracking
    this.requestIdToUsedHashes = {};
    this.logger = logger;
    this.cacheDir = cacheDir;
    this.cacheFile = path2.join(cacheDir, cacheFile);
    this.lockFile = path2.join(cacheDir, "cache.lock");
    this.ensureCacheDirectory();
    this.setupProcessHandlers();
  }
  setupProcessHandlers() {
    const releaseLockAndExit = () => {
      this.releaseLock();
      process.exit();
    };
    process.on("exit", releaseLockAndExit);
    process.on("SIGINT", releaseLockAndExit);
    process.on("SIGTERM", releaseLockAndExit);
    process.on("uncaughtException", (err) => {
      this.logger({
        category: "base_cache",
        message: "uncaught exception",
        level: 2,
        auxiliary: {
          error: {
            value: err.message,
            type: "string"
          },
          trace: {
            value: err.stack,
            type: "string"
          }
        }
      });
      if (this.lockAcquired) {
        releaseLockAndExit();
      }
    });
  }
  ensureCacheDirectory() {
    if (!fs2.existsSync(this.cacheDir)) {
      fs2.mkdirSync(this.cacheDir, { recursive: true });
      this.logger({
        category: "base_cache",
        message: "created cache directory",
        level: 1,
        auxiliary: {
          cacheDir: {
            value: this.cacheDir,
            type: "string"
          }
        }
      });
    }
  }
  createHash(data) {
    const hash = crypto2.createHash("sha256");
    return hash.update(JSON.stringify(data)).digest("hex");
  }
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  acquireLock() {
    return __async(this, null, function* () {
      const startTime = Date.now();
      while (Date.now() - startTime < this.LOCK_TIMEOUT_MS) {
        try {
          if (fs2.existsSync(this.lockFile)) {
            const lockAge = Date.now() - fs2.statSync(this.lockFile).mtimeMs;
            if (lockAge > this.LOCK_TIMEOUT_MS) {
              fs2.unlinkSync(this.lockFile);
              this.logger({
                category: "base_cache",
                message: "Stale lock file removed",
                level: 1
              });
            }
          }
          fs2.writeFileSync(this.lockFile, process.pid.toString(), { flag: "wx" });
          this.lockAcquireFailures = 0;
          this.lockAcquired = true;
          this.logger({
            category: "base_cache",
            message: "Lock acquired",
            level: 1
          });
          return true;
        } catch (error) {
          yield this.sleep(5);
        }
      }
      this.logger({
        category: "base_cache",
        message: "Failed to acquire lock after timeout",
        level: 2
      });
      this.lockAcquireFailures++;
      if (this.lockAcquireFailures >= 3) {
        this.logger({
          category: "base_cache",
          message: "Failed to acquire lock 3 times in a row. Releasing lock manually.",
          level: 1
        });
        this.releaseLock();
      }
      return false;
    });
  }
  releaseLock() {
    try {
      if (fs2.existsSync(this.lockFile)) {
        fs2.unlinkSync(this.lockFile);
        this.logger({
          category: "base_cache",
          message: "Lock released",
          level: 1
        });
      }
      this.lockAcquired = false;
    } catch (error) {
      this.logger({
        category: "base_cache",
        message: "error releasing lock",
        level: 2,
        auxiliary: {
          error: {
            value: error.message,
            type: "string"
          },
          trace: {
            value: error.stack,
            type: "string"
          }
        }
      });
    }
  }
  /**
   * Cleans up stale cache entries that exceed the maximum age.
   */
  cleanupStaleEntries() {
    return __async(this, null, function* () {
      if (!(yield this.acquireLock())) {
        this.logger({
          category: "llm_cache",
          message: "failed to acquire lock for cleanup",
          level: 2
        });
        return;
      }
      try {
        const cache = this.readCache();
        const now = Date.now();
        let entriesRemoved = 0;
        for (const [hash, entry] of Object.entries(cache)) {
          if (now - entry.timestamp > this.CACHE_MAX_AGE_MS) {
            delete cache[hash];
            entriesRemoved++;
          }
        }
        if (entriesRemoved > 0) {
          this.writeCache(cache);
          this.logger({
            category: "llm_cache",
            message: "cleaned up stale cache entries",
            level: 1,
            auxiliary: {
              entriesRemoved: {
                value: entriesRemoved.toString(),
                type: "integer"
              }
            }
          });
        }
      } catch (error) {
        this.logger({
          category: "llm_cache",
          message: "error during cache cleanup",
          level: 2,
          auxiliary: {
            error: {
              value: error.message,
              type: "string"
            },
            trace: {
              value: error.stack,
              type: "string"
            }
          }
        });
      } finally {
        this.releaseLock();
      }
    });
  }
  readCache() {
    if (fs2.existsSync(this.cacheFile)) {
      try {
        const data = fs2.readFileSync(this.cacheFile, "utf-8");
        return JSON.parse(data);
      } catch (error) {
        this.logger({
          category: "base_cache",
          message: "error reading cache file. resetting cache.",
          level: 1,
          auxiliary: {
            error: {
              value: error.message,
              type: "string"
            },
            trace: {
              value: error.stack,
              type: "string"
            }
          }
        });
        this.resetCache();
        return {};
      }
    }
    return {};
  }
  writeCache(cache) {
    try {
      fs2.writeFileSync(this.cacheFile, JSON.stringify(cache, null, 2));
      this.logger({
        category: "base_cache",
        message: "Cache written to file",
        level: 1
      });
    } catch (error) {
      this.logger({
        category: "base_cache",
        message: "error writing cache file",
        level: 2,
        auxiliary: {
          error: {
            value: error.message,
            type: "string"
          },
          trace: {
            value: error.stack,
            type: "string"
          }
        }
      });
    } finally {
      this.releaseLock();
    }
  }
  /**
   * Retrieves data from the cache based on the provided options.
   * @param hashObj - The options used to generate the cache key.
   * @param requestId - The identifier for the current request.
   * @returns The cached data if available, otherwise null.
   */
  get(hashObj, requestId) {
    return __async(this, null, function* () {
      if (!(yield this.acquireLock())) {
        this.logger({
          category: "base_cache",
          message: "Failed to acquire lock for getting cache",
          level: 2
        });
        return null;
      }
      try {
        const hash = this.createHash(hashObj);
        const cache = this.readCache();
        if (cache[hash]) {
          this.trackRequestIdUsage(requestId, hash);
          return cache[hash].data;
        }
        return null;
      } catch (error) {
        this.logger({
          category: "base_cache",
          message: "error getting cache. resetting cache.",
          level: 1,
          auxiliary: {
            error: {
              value: error.message,
              type: "string"
            },
            trace: {
              value: error.stack,
              type: "string"
            }
          }
        });
        this.resetCache();
        return null;
      } finally {
        this.releaseLock();
      }
    });
  }
  /**
   * Stores data in the cache based on the provided options and requestId.
   * @param hashObj - The options used to generate the cache key.
   * @param data - The data to be cached.
   * @param requestId - The identifier for the cache entry.
   */
  set(hashObj, data, requestId) {
    return __async(this, null, function* () {
      if (!(yield this.acquireLock())) {
        this.logger({
          category: "base_cache",
          message: "Failed to acquire lock for setting cache",
          level: 2
        });
        return;
      }
      try {
        const hash = this.createHash(hashObj);
        const cache = this.readCache();
        cache[hash] = {
          data,
          timestamp: Date.now(),
          requestId
        };
        this.writeCache(cache);
        this.trackRequestIdUsage(requestId, hash);
      } catch (error) {
        this.logger({
          category: "base_cache",
          message: "error setting cache. resetting cache.",
          level: 1,
          auxiliary: {
            error: {
              value: error.message,
              type: "string"
            },
            trace: {
              value: error.stack,
              type: "string"
            }
          }
        });
        this.resetCache();
      } finally {
        this.releaseLock();
        if (Math.random() < this.CLEANUP_PROBABILITY) {
          this.cleanupStaleEntries();
        }
      }
    });
  }
  delete(hashObj) {
    return __async(this, null, function* () {
      if (!(yield this.acquireLock())) {
        this.logger({
          category: "base_cache",
          message: "Failed to acquire lock for removing cache entry",
          level: 2
        });
        return;
      }
      try {
        const hash = this.createHash(hashObj);
        const cache = this.readCache();
        if (cache[hash]) {
          delete cache[hash];
          this.writeCache(cache);
        } else {
          this.logger({
            category: "base_cache",
            message: "Cache entry not found to delete",
            level: 1
          });
        }
      } catch (error) {
        this.logger({
          category: "base_cache",
          message: "error removing cache entry",
          level: 2,
          auxiliary: {
            error: {
              value: error.message,
              type: "string"
            },
            trace: {
              value: error.stack,
              type: "string"
            }
          }
        });
      } finally {
        this.releaseLock();
      }
    });
  }
  /**
   * Tracks the usage of a hash with a specific requestId.
   * @param requestId - The identifier for the current request.
   * @param hash - The cache key hash.
   */
  trackRequestIdUsage(requestId, hash) {
    var _a, _b;
    (_b = (_a = this.requestIdToUsedHashes)[requestId]) != null ? _b : _a[requestId] = [];
    this.requestIdToUsedHashes[requestId].push(hash);
  }
  /**
   * Deletes all cache entries associated with a specific requestId.
   * @param requestId - The identifier for the request whose cache entries should be deleted.
   */
  deleteCacheForRequestId(requestId) {
    return __async(this, null, function* () {
      var _a;
      if (!(yield this.acquireLock())) {
        this.logger({
          category: "base_cache",
          message: "Failed to acquire lock for deleting cache",
          level: 2
        });
        return;
      }
      try {
        const cache = this.readCache();
        const hashes = (_a = this.requestIdToUsedHashes[requestId]) != null ? _a : [];
        let entriesRemoved = 0;
        for (const hash of hashes) {
          if (cache[hash]) {
            delete cache[hash];
            entriesRemoved++;
          }
        }
        if (entriesRemoved > 0) {
          this.writeCache(cache);
        } else {
          this.logger({
            category: "base_cache",
            message: "no cache entries found for requestId",
            level: 1,
            auxiliary: {
              requestId: {
                value: requestId,
                type: "string"
              }
            }
          });
        }
        delete this.requestIdToUsedHashes[requestId];
      } catch (error) {
        this.logger({
          category: "base_cache",
          message: "error deleting cache for requestId",
          level: 2,
          auxiliary: {
            error: {
              value: error.message,
              type: "string"
            },
            trace: {
              value: error.stack,
              type: "string"
            },
            requestId: {
              value: requestId,
              type: "string"
            }
          }
        });
      } finally {
        this.releaseLock();
      }
    });
  }
  /**
   * Resets the entire cache by clearing the cache file.
   */
  resetCache() {
    try {
      fs2.writeFileSync(this.cacheFile, "{}");
      this.requestIdToUsedHashes = {};
    } catch (error) {
      this.logger({
        category: "base_cache",
        message: "error resetting cache",
        level: 2,
        auxiliary: {
          error: {
            value: error.message,
            type: "string"
          },
          trace: {
            value: error.stack,
            type: "string"
          }
        }
      });
    } finally {
      this.releaseLock();
    }
  }
};

// lib/cache/ActionCache.ts
var ActionCache = class _ActionCache extends BaseCache {
  constructor(logger, cacheDir, cacheFile) {
    super(logger, cacheDir, cacheFile || "action_cache.json");
  }
  addActionStep(_0) {
    return __async(this, arguments, function* ({
      url,
      action,
      previousSelectors,
      playwrightCommand,
      componentString,
      xpaths,
      newStepString,
      completed,
      requestId
    }) {
      this.logger({
        category: "action_cache",
        message: "adding action step to cache",
        level: 1,
        auxiliary: {
          action: {
            value: action,
            type: "string"
          },
          requestId: {
            value: requestId,
            type: "string"
          },
          url: {
            value: url,
            type: "string"
          },
          previousSelectors: {
            value: JSON.stringify(previousSelectors),
            type: "object"
          }
        }
      });
      yield this.set(
        { url, action, previousSelectors },
        {
          playwrightCommand,
          componentString,
          xpaths,
          newStepString,
          completed,
          previousSelectors,
          action
        },
        requestId
      );
    });
  }
  /**
   * Retrieves all actions for a specific trajectory.
   * @param trajectoryId - Unique identifier for the trajectory.
   * @param requestId - The identifier for the current request.
   * @returns An array of TrajectoryEntry objects or null if not found.
   */
  getActionStep(_0) {
    return __async(this, arguments, function* ({
      url,
      action,
      previousSelectors,
      requestId
    }) {
      const data = yield __superGet(_ActionCache.prototype, this, "get").call(this, { url, action, previousSelectors }, requestId);
      if (!data) {
        return null;
      }
      return data;
    });
  }
  removeActionStep(cacheHashObj) {
    return __async(this, null, function* () {
      yield __superGet(_ActionCache.prototype, this, "delete").call(this, cacheHashObj);
    });
  }
  /**
   * Clears all actions for a specific trajectory.
   * @param trajectoryId - Unique identifier for the trajectory.
   * @param requestId - The identifier for the current request.
   */
  clearAction(requestId) {
    return __async(this, null, function* () {
      yield __superGet(_ActionCache.prototype, this, "deleteCacheForRequestId").call(this, requestId);
      this.logger({
        category: "action_cache",
        message: "cleared action for ID",
        level: 1,
        auxiliary: {
          requestId: {
            value: requestId,
            type: "string"
          }
        }
      });
    });
  }
  /**
   * Resets the entire action cache.
   */
  resetCache() {
    return __async(this, null, function* () {
      yield __superGet(_ActionCache.prototype, this, "resetCache").call(this);
      this.logger({
        category: "action_cache",
        message: "Action cache has been reset.",
        level: 1
      });
    });
  }
};

// types/playwright.ts
var PlaywrightCommandException = class extends Error {
  constructor(message) {
    super(message);
    this.name = "PlaywrightCommandException";
  }
};
var PlaywrightCommandMethodNotSupportedException = class extends Error {
  constructor(message) {
    super(message);
    this.name = "PlaywrightCommandMethodNotSupportedException";
  }
};

// lib/handlers/actHandler.ts
var StagehandActHandler = class {
  constructor({
    stagehand,
    verbose,
    llmProvider,
    enableCaching,
    logger,
    waitForSettledDom,
    llmClient,
    startDomDebug,
    cleanupDomDebug
  }) {
    this.stagehand = stagehand;
    this.verbose = verbose;
    this.llmProvider = llmProvider;
    this.enableCaching = enableCaching;
    this.logger = logger;
    this.waitForSettledDom = waitForSettledDom;
    this.actionCache = enableCaching ? new ActionCache(this.logger) : void 0;
    this.llmClient = llmClient;
    this.startDomDebug = startDomDebug;
    this.cleanupDomDebug = cleanupDomDebug;
    this.actions = {};
  }
  _recordAction(action, result) {
    return __async(this, null, function* () {
      const id = generateId(action);
      this.actions[id] = { result, action };
      return id;
    });
  }
  _verifyActionCompletion(_0) {
    return __async(this, arguments, function* ({
      completed,
      verifierUseVision,
      requestId,
      action,
      steps,
      llmClient,
      domSettleTimeoutMs
    }) {
      yield this.waitForSettledDom(domSettleTimeoutMs);
      const { selectorMap } = yield this.stagehand.page.evaluate(() => {
        return window.processAllOfDom();
      });
      let actionCompleted = false;
      if (completed) {
        this.stagehand.log({
          category: "action",
          message: "action marked as completed, verifying if this is true...",
          level: 1,
          auxiliary: {
            action: {
              value: action,
              type: "string"
            }
          }
        });
        let domElements = void 0;
        let fullpageScreenshot = void 0;
        if (verifierUseVision) {
          try {
            const screenshotService = new ScreenshotService(
              this.stagehand.page,
              selectorMap,
              this.verbose,
              this.logger
            );
            fullpageScreenshot = yield screenshotService.getScreenshot(true, 15);
          } catch (e) {
            this.stagehand.log({
              category: "action",
              message: "error getting full page screenshot. trying again...",
              level: 1,
              auxiliary: {
                error: {
                  value: e.message,
                  type: "string"
                },
                trace: {
                  value: e.stack,
                  type: "string"
                }
              }
            });
            const screenshotService = new ScreenshotService(
              this.stagehand.page,
              selectorMap,
              this.verbose,
              this.logger
            );
            fullpageScreenshot = yield screenshotService.getScreenshot(true, 15);
          }
        } else {
          ({ outputString: domElements } = yield this.stagehand.page.evaluate(
            () => {
              return window.processAllOfDom();
            }
          ));
        }
        actionCompleted = yield verifyActCompletion({
          goal: action,
          steps,
          llmProvider: this.llmProvider,
          llmClient,
          screenshot: fullpageScreenshot,
          domElements,
          logger: this.logger,
          requestId
        });
        this.stagehand.log({
          category: "action",
          message: "action completion verification result",
          level: 1,
          auxiliary: {
            action: {
              value: action,
              type: "string"
            },
            result: {
              value: actionCompleted.toString(),
              type: "boolean"
            }
          }
        });
      }
      return actionCompleted;
    });
  }
  _performPlaywrightMethod(method, args, xpath, domSettleTimeoutMs) {
    return __async(this, null, function* () {
      var _a, _b;
      const locator = this.stagehand.page.locator(`xpath=${xpath}`).first();
      const initialUrl = this.stagehand.page.url();
      if (method === "scrollIntoView") {
        this.stagehand.log({
          category: "action",
          message: "scrolling element into view",
          level: 2,
          auxiliary: {
            xpath: {
              value: xpath,
              type: "string"
            }
          }
        });
        try {
          yield locator.evaluate((element) => {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }).catch((e) => {
            this.stagehand.log({
              category: "action",
              message: "error scrolling element into view",
              level: 1,
              auxiliary: {
                error: {
                  value: e.message,
                  type: "string"
                },
                trace: {
                  value: e.stack,
                  type: "string"
                },
                xpath: {
                  value: xpath,
                  type: "string"
                }
              }
            });
          });
        } catch (e) {
          this.stagehand.log({
            category: "action",
            message: "error scrolling element into view",
            level: 1,
            auxiliary: {
              error: {
                value: e.message,
                type: "string"
              },
              trace: {
                value: e.stack,
                type: "string"
              },
              xpath: {
                value: xpath,
                type: "string"
              }
            }
          });
          throw new PlaywrightCommandException(e.message);
        }
      } else if (method === "fill" || method === "type") {
        try {
          yield locator.fill("");
          yield locator.click();
          const text = args[0];
          for (const char of text) {
            yield this.stagehand.page.keyboard.type(char, {
              delay: Math.random() * 50 + 25
            });
          }
        } catch (e) {
          this.logger({
            category: "action",
            message: "error filling element",
            level: 1,
            auxiliary: {
              error: {
                value: e.message,
                type: "string"
              },
              trace: {
                value: e.stack,
                type: "string"
              },
              xpath: {
                value: xpath,
                type: "string"
              }
            }
          });
          throw new PlaywrightCommandException(e.message);
        }
      } else if (method === "press") {
        try {
          const key = args[0];
          yield this.stagehand.page.keyboard.press(key);
        } catch (e) {
          this.logger({
            category: "action",
            message: "error pressing key",
            level: 1,
            auxiliary: {
              error: {
                value: e.message,
                type: "string"
              },
              trace: {
                value: e.stack,
                type: "string"
              },
              key: {
                value: (_b = (_a = args[0]) == null ? void 0 : _a.toString()) != null ? _b : "unknown",
                type: "string"
              }
            }
          });
          throw new PlaywrightCommandException(e.message);
        }
      } else if (typeof locator[method] === "function") {
        this.logger({
          category: "action",
          message: "page URL before action",
          level: 2,
          auxiliary: {
            url: {
              value: this.stagehand.page.url(),
              type: "string"
            }
          }
        });
        try {
          yield locator[method](...args);
        } catch (e) {
          this.logger({
            category: "action",
            message: "error performing method",
            level: 1,
            auxiliary: {
              error: {
                value: e.message,
                type: "string"
              },
              trace: {
                value: e.stack,
                type: "string"
              },
              xpath: {
                value: xpath,
                type: "string"
              },
              method: {
                value: method,
                type: "string"
              },
              args: {
                value: JSON.stringify(args),
                type: "object"
              }
            }
          });
          throw new PlaywrightCommandException(e.message);
        }
        if (method === "click") {
          this.logger({
            category: "action",
            message: "clicking element, checking for page navigation",
            level: 1,
            auxiliary: {
              xpath: {
                value: xpath,
                type: "string"
              }
            }
          });
          const newOpenedTab = yield Promise.race([
            new Promise((resolve) => {
              this.stagehand.context.once("page", (page) => resolve(page));
              setTimeout(() => resolve(null), 1500);
            })
          ]);
          this.logger({
            category: "action",
            message: "clicked element",
            level: 1,
            auxiliary: {
              newOpenedTab: {
                value: newOpenedTab ? "opened a new tab" : "no new tabs opened",
                type: "string"
              }
            }
          });
          if (newOpenedTab) {
            this.logger({
              category: "action",
              message: "new page detected (new tab) with URL",
              level: 1,
              auxiliary: {
                url: {
                  value: newOpenedTab.url(),
                  type: "string"
                }
              }
            });
            yield newOpenedTab.close();
            yield this.stagehand.page.goto(newOpenedTab.url());
            yield this.stagehand.page.waitForLoadState("domcontentloaded");
            yield this.waitForSettledDom(domSettleTimeoutMs);
          }
          yield Promise.race([
            this.stagehand.page.waitForLoadState("networkidle"),
            new Promise((resolve) => setTimeout(resolve, 5e3))
          ]).catch((e) => {
            this.logger({
              category: "action",
              message: "network idle timeout hit",
              level: 1
            });
          });
          this.logger({
            category: "action",
            message: "finished waiting for (possible) page navigation",
            level: 1
          });
          if (this.stagehand.page.url() !== initialUrl) {
            this.logger({
              category: "action",
              message: "new page detected with URL",
              level: 1,
              auxiliary: {
                url: {
                  value: this.stagehand.page.url(),
                  type: "string"
                }
              }
            });
          }
        }
      } else {
        this.logger({
          category: "action",
          message: "chosen method is invalid",
          level: 1,
          auxiliary: {
            method: {
              value: method,
              type: "string"
            }
          }
        });
        throw new PlaywrightCommandMethodNotSupportedException(
          `Method ${method} not supported`
        );
      }
      yield this.waitForSettledDom(domSettleTimeoutMs);
    });
  }
  _getComponentString(locator) {
    return __async(this, null, function* () {
      return yield locator.evaluate((el) => {
        const clone = el.cloneNode(true);
        const attributesToKeep = [
          "type",
          "name",
          "placeholder",
          "aria-label",
          "role",
          "href",
          "title",
          "alt"
        ];
        Array.from(clone.attributes).forEach((attr) => {
          if (!attributesToKeep.includes(attr.name)) {
            clone.removeAttribute(attr.name);
          }
        });
        const outerHtml = clone.outerHTML;
        return outerHtml.trim().replace(/\s+/g, " ");
      });
    });
  }
  getElement(xpath, timeout = 5e3) {
    return __async(this, null, function* () {
      try {
        const element = this.stagehand.page.locator(`xpath=${xpath}`).first();
        yield element.waitFor({ state: "attached", timeout });
        return element;
      } catch (e) {
        this.logger({
          category: "action",
          message: "element not found within timeout",
          level: 1,
          auxiliary: {
            xpath: {
              value: xpath,
              type: "string"
            },
            timeout_ms: {
              value: timeout.toString(),
              type: "integer"
            }
          }
        });
        return null;
      }
    });
  }
  _checkIfCachedStepIsValid_oneXpath(cachedStep) {
    return __async(this, null, function* () {
      this.logger({
        category: "action",
        message: "checking if cached step is valid",
        level: 1,
        auxiliary: {
          xpath: {
            value: cachedStep.xpath,
            type: "string"
          },
          savedComponentString: {
            value: cachedStep.savedComponentString,
            type: "string"
          }
        }
      });
      try {
        const locator = yield this.getElement(cachedStep.xpath);
        if (!locator) {
          this.logger({
            category: "action",
            message: "locator not found for xpath",
            level: 1,
            auxiliary: {
              xpath: {
                value: cachedStep.xpath,
                type: "string"
              }
            }
          });
          return false;
        }
        this.logger({
          category: "action",
          message: "locator element",
          level: 1,
          auxiliary: {
            componentString: {
              value: yield this._getComponentString(locator),
              type: "string"
            }
          }
        });
        let currentComponent = yield this._getComponentString(locator);
        this.logger({
          category: "action",
          message: "current text",
          level: 1,
          auxiliary: {
            componentString: {
              value: currentComponent,
              type: "string"
            }
          }
        });
        if (!currentComponent || !cachedStep.savedComponentString) {
          this.logger({
            category: "action",
            message: "current text or cached text is undefined",
            level: 1
          });
          return false;
        }
        const normalizedCurrentText = currentComponent.trim().replace(/\s+/g, " ");
        const normalizedCachedText = cachedStep.savedComponentString.trim().replace(/\s+/g, " ");
        if (normalizedCurrentText !== normalizedCachedText) {
          this.logger({
            category: "action",
            message: "current text and cached text do not match",
            level: 1,
            auxiliary: {
              currentText: {
                value: normalizedCurrentText,
                type: "string"
              },
              cachedText: {
                value: normalizedCachedText,
                type: "string"
              }
            }
          });
          return false;
        }
        return true;
      } catch (e) {
        this.logger({
          category: "action",
          message: "error checking if cached step is valid",
          level: 1,
          auxiliary: {
            error: {
              value: e.message,
              type: "string"
            },
            trace: {
              value: e.stack,
              type: "string"
            }
          }
        });
        return false;
      }
    });
  }
  _getValidCachedStepXpath(cachedStep) {
    return __async(this, null, function* () {
      const reversedXpaths = [...cachedStep.xpaths].reverse();
      for (const xpath of reversedXpaths) {
        const isValid = yield this._checkIfCachedStepIsValid_oneXpath({
          xpath,
          savedComponentString: cachedStep.savedComponentString
        });
        if (isValid) {
          return xpath;
        }
      }
      return null;
    });
  }
  _runCachedActionIfAvailable(_0) {
    return __async(this, arguments, function* ({
      action,
      previousSelectors,
      requestId,
      steps,
      chunksSeen,
      llmClient,
      useVision,
      verifierUseVision,
      retries,
      variables,
      domSettleTimeoutMs
    }) {
      var _a, _b;
      if (!this.enableCaching) {
        return null;
      }
      const cacheObj = {
        url: this.stagehand.page.url(),
        action,
        previousSelectors,
        requestId
      };
      this.logger({
        category: "action",
        message: "checking action cache",
        level: 1,
        auxiliary: {
          cacheObj: {
            value: JSON.stringify(cacheObj),
            type: "object"
          }
        }
      });
      const cachedStep = yield this.actionCache.getActionStep(cacheObj);
      if (!cachedStep) {
        this.logger({
          category: "action",
          message: "action cache miss",
          level: 1,
          auxiliary: {
            cacheObj: {
              value: JSON.stringify(cacheObj),
              type: "object"
            }
          }
        });
        return null;
      }
      this.logger({
        category: "action",
        message: "action cache semi-hit",
        level: 1,
        auxiliary: {
          playwrightCommand: {
            value: JSON.stringify(cachedStep.playwrightCommand),
            type: "object"
          }
        }
      });
      try {
        const validXpath = yield this._getValidCachedStepXpath({
          xpaths: cachedStep.xpaths,
          savedComponentString: cachedStep.componentString
        });
        this.logger({
          category: "action",
          message: "cached action step is valid",
          level: 1,
          auxiliary: {
            validXpath: {
              value: validXpath,
              type: "string"
            }
          }
        });
        if (!validXpath) {
          this.logger({
            category: "action",
            message: "cached action step is invalid, removing...",
            level: 1,
            auxiliary: {
              cacheObj: {
                value: JSON.stringify(cacheObj),
                type: "object"
              }
            }
          });
          yield (_a = this.actionCache) == null ? void 0 : _a.removeActionStep(cacheObj);
          return null;
        }
        this.logger({
          category: "action",
          message: "action cache hit",
          level: 1,
          auxiliary: {
            playwrightCommand: {
              value: JSON.stringify(cachedStep.playwrightCommand),
              type: "object"
            }
          }
        });
        cachedStep.playwrightCommand.args = cachedStep.playwrightCommand.args.map(
          (arg) => {
            return fillInVariables(arg, variables);
          }
        );
        yield this._performPlaywrightMethod(
          cachedStep.playwrightCommand.method,
          cachedStep.playwrightCommand.args,
          validXpath,
          domSettleTimeoutMs
        );
        steps = steps + cachedStep.newStepString;
        const { outputString, selectorMap } = yield this.stagehand.page.evaluate(
          ({ chunksSeen: chunksSeen2 }) => {
            return window.processDom(chunksSeen2);
          },
          { chunksSeen }
        );
        if (cachedStep.completed) {
          let actionCompleted = yield this._verifyActionCompletion({
            completed: true,
            verifierUseVision,
            llmClient,
            steps,
            requestId,
            action,
            domSettleTimeoutMs
          });
          this.logger({
            category: "action",
            message: "action completion verification result from cache",
            level: 1,
            auxiliary: {
              actionCompleted: {
                value: actionCompleted.toString(),
                type: "boolean"
              }
            }
          });
          if (actionCompleted) {
            return {
              success: true,
              message: "action completed successfully using cached step",
              action
            };
          }
        }
        return this.act({
          action,
          steps,
          chunksSeen,
          llmClient,
          useVision,
          verifierUseVision,
          retries,
          requestId,
          variables,
          previousSelectors: [...previousSelectors, cachedStep.xpaths[0]],
          skipActionCacheForThisStep: false,
          domSettleTimeoutMs
        });
      } catch (exception) {
        this.logger({
          category: "action",
          message: "error performing cached action step",
          level: 1,
          auxiliary: {
            error: {
              value: exception.message,
              type: "string"
            },
            trace: {
              value: exception.stack,
              type: "string"
            }
          }
        });
        yield (_b = this.actionCache) == null ? void 0 : _b.removeActionStep(cacheObj);
        return null;
      }
    });
  }
  act(_0) {
    return __async(this, arguments, function* ({
      action,
      steps = "",
      chunksSeen,
      llmClient,
      useVision,
      verifierUseVision,
      retries = 0,
      requestId,
      variables,
      previousSelectors,
      skipActionCacheForThisStep = false,
      domSettleTimeoutMs
    }) {
      var _a, _b;
      try {
        yield this.waitForSettledDom(domSettleTimeoutMs);
        yield this.startDomDebug();
        if (this.enableCaching && !skipActionCacheForThisStep) {
          const response2 = yield this._runCachedActionIfAvailable({
            action,
            previousSelectors,
            requestId,
            steps,
            chunksSeen,
            llmClient,
            useVision,
            verifierUseVision,
            retries,
            variables,
            domSettleTimeoutMs
          });
          if (response2 !== null) {
            return response2;
          } else {
            return this.act({
              action,
              steps,
              chunksSeen,
              llmClient,
              useVision,
              verifierUseVision,
              retries,
              requestId,
              variables,
              previousSelectors,
              skipActionCacheForThisStep: true,
              domSettleTimeoutMs
            });
          }
        }
        if (!llmClient.hasVision && (useVision !== false || verifierUseVision)) {
          this.logger({
            category: "action",
            message: "model does not support vision but useVision was not false. defaulting to false.",
            level: 1,
            auxiliary: {
              model: {
                value: llmClient.modelName,
                type: "string"
              },
              useVision: {
                value: useVision.toString(),
                type: "boolean"
              }
            }
          });
          useVision = false;
          verifierUseVision = false;
        }
        this.logger({
          category: "action",
          message: "running / continuing action",
          level: 2,
          auxiliary: {
            action: {
              value: action,
              type: "string"
            },
            pageUrl: {
              value: this.stagehand.page.url(),
              type: "string"
            }
          }
        });
        this.logger({
          category: "action",
          message: "processing DOM",
          level: 2
        });
        const { outputString, selectorMap, chunk, chunks } = yield this.stagehand.page.evaluate(
          ({ chunksSeen: chunksSeen2 }) => {
            return window.processDom(chunksSeen2);
          },
          { chunksSeen }
        );
        this.logger({
          category: "action",
          message: "looking at chunk",
          level: 1,
          auxiliary: {
            chunk: {
              value: chunk.toString(),
              type: "integer"
            },
            chunks: {
              value: chunks.length.toString(),
              type: "integer"
            },
            chunksSeen: {
              value: chunksSeen.length.toString(),
              type: "integer"
            },
            chunksLeft: {
              value: (chunks.length - chunksSeen.length).toString(),
              type: "integer"
            }
          }
        });
        let annotatedScreenshot;
        if (useVision === true) {
          if (!llmClient.hasVision) {
            this.logger({
              category: "action",
              message: "model does not support vision. skipping vision processing.",
              level: 1,
              auxiliary: {
                model: {
                  value: llmClient.modelName,
                  type: "string"
                }
              }
            });
          } else {
            const screenshotService = new ScreenshotService(
              this.stagehand.page,
              selectorMap,
              this.verbose,
              this.logger
            );
            annotatedScreenshot = yield screenshotService.getAnnotatedScreenshot(false);
          }
        }
        const response = yield act({
          action,
          domElements: outputString,
          steps,
          llmClient,
          screenshot: annotatedScreenshot,
          logger: this.logger,
          requestId,
          variables
        });
        this.logger({
          category: "action",
          message: "received response from LLM",
          level: 1,
          auxiliary: {
            response: {
              value: JSON.stringify(response),
              type: "object"
            }
          }
        });
        yield this.cleanupDomDebug();
        if (!response) {
          if (chunksSeen.length + 1 < chunks.length) {
            chunksSeen.push(chunk);
            this.logger({
              category: "action",
              message: "no action found in current chunk",
              level: 1,
              auxiliary: {
                chunksSeen: {
                  value: chunksSeen.length.toString(),
                  type: "integer"
                }
              }
            });
            return this.act({
              action,
              steps: steps + (!steps.endsWith("\n") ? "\n" : "") + "## Step: Scrolled to another section\n",
              chunksSeen,
              llmClient,
              useVision,
              verifierUseVision,
              requestId,
              variables,
              previousSelectors,
              skipActionCacheForThisStep,
              domSettleTimeoutMs
            });
          } else if (useVision === "fallback") {
            this.logger({
              category: "action",
              message: "switching to vision-based processing",
              level: 1,
              auxiliary: {
                useVision: {
                  value: useVision.toString(),
                  type: "string"
                }
              }
            });
            yield this.stagehand.page.evaluate(() => window.scrollToHeight(0));
            return yield this.act({
              action,
              steps,
              chunksSeen,
              llmClient,
              useVision: true,
              verifierUseVision,
              requestId,
              variables,
              previousSelectors,
              skipActionCacheForThisStep,
              domSettleTimeoutMs
            });
          } else {
            if (this.enableCaching) {
              this.llmProvider.cleanRequestCache(requestId);
              (_a = this.actionCache) == null ? void 0 : _a.deleteCacheForRequestId(requestId);
            }
            return {
              success: false,
              message: `Action was not able to be completed.`,
              action
            };
          }
        }
        const elementId = response["element"];
        const xpaths = selectorMap[elementId];
        const method = response["method"];
        const args = response["args"];
        const elementLines = outputString.split("\n");
        const elementText = ((_b = elementLines.find((line) => line.startsWith(`${elementId}:`))) == null ? void 0 : _b.split(":")[1]) || "Element not found";
        this.logger({
          category: "action",
          message: "executing method",
          level: 1,
          auxiliary: {
            method: {
              value: method,
              type: "string"
            },
            elementId: {
              value: elementId.toString(),
              type: "integer"
            },
            xpaths: {
              value: JSON.stringify(xpaths),
              type: "object"
            },
            args: {
              value: JSON.stringify(args),
              type: "object"
            }
          }
        });
        try {
          const initialUrl = this.stagehand.page.url();
          const locator = this.stagehand.page.locator(`xpath=${xpaths[0]}`).first();
          const originalUrl = this.stagehand.page.url();
          const componentString = yield this._getComponentString(locator);
          const responseArgs = [...args];
          if (variables) {
            responseArgs.forEach((arg, index) => {
              if (typeof arg === "string") {
                args[index] = fillInVariables(arg, variables);
              }
            });
          }
          yield this._performPlaywrightMethod(
            method,
            args,
            xpaths[0],
            domSettleTimeoutMs
          );
          const newStepString = (!steps.endsWith("\n") ? "\n" : "") + `## Step: ${response.step}
  Element: ${elementText}
  Action: ${response.method}
  Reasoning: ${response.why}
`;
          steps += newStepString;
          if (this.enableCaching) {
            this.actionCache.addActionStep({
              action,
              url: originalUrl,
              previousSelectors,
              playwrightCommand: {
                method,
                args: responseArgs
              },
              componentString,
              requestId,
              xpaths,
              newStepString,
              completed: response.completed
            }).catch((e) => {
              this.logger({
                category: "action",
                message: "error adding action step to cache",
                level: 1,
                auxiliary: {
                  error: {
                    value: e.message,
                    type: "string"
                  },
                  trace: {
                    value: e.stack,
                    type: "string"
                  }
                }
              });
            });
          }
          if (this.stagehand.page.url() !== initialUrl) {
            steps += `  Result (Important): Page URL changed from ${initialUrl} to ${this.stagehand.page.url()}

`;
          }
          const actionCompleted = yield this._verifyActionCompletion({
            completed: response.completed,
            verifierUseVision,
            requestId,
            action,
            steps,
            llmClient,
            domSettleTimeoutMs
          });
          if (!actionCompleted) {
            this.logger({
              category: "action",
              message: "continuing to next action step",
              level: 1
            });
            return this.act({
              action,
              steps,
              llmClient,
              chunksSeen,
              useVision,
              verifierUseVision,
              requestId,
              variables,
              previousSelectors: [...previousSelectors, xpaths[0]],
              skipActionCacheForThisStep: false,
              domSettleTimeoutMs
            });
          } else {
            this.logger({
              category: "action",
              message: "action completed successfully",
              level: 1
            });
            yield this._recordAction(action, response.step);
            return {
              success: true,
              message: `Action completed successfully: ${steps}${response.step}`,
              action
            };
          }
        } catch (error) {
          this.logger({
            category: "action",
            message: "error performing action - d",
            level: 1,
            auxiliary: {
              error: {
                value: error.message,
                type: "string"
              },
              trace: {
                value: error.stack,
                type: "string"
              },
              retries: {
                value: retries.toString(),
                type: "integer"
              }
            }
          });
          if (retries < 2) {
            return this.act({
              action,
              steps,
              llmClient,
              useVision,
              verifierUseVision,
              retries: retries + 1,
              chunksSeen,
              requestId,
              variables,
              previousSelectors,
              skipActionCacheForThisStep,
              domSettleTimeoutMs
            });
          }
          yield this._recordAction(action, "");
          if (this.enableCaching) {
            this.llmProvider.cleanRequestCache(requestId);
            this.actionCache.deleteCacheForRequestId(requestId);
          }
          return {
            success: false,
            message: "error performing action - a",
            action
          };
        }
      } catch (error) {
        this.logger({
          category: "action",
          message: "error performing action - b",
          level: 1,
          auxiliary: {
            error: {
              value: error.message,
              type: "string"
            },
            trace: {
              value: error.stack,
              type: "string"
            }
          }
        });
        if (this.enableCaching) {
          this.llmProvider.cleanRequestCache(requestId);
          this.actionCache.deleteCacheForRequestId(requestId);
        }
        return {
          success: false,
          message: `Error performing action - C: ${error.message}`,
          action
        };
      }
    });
  }
};

// lib/handlers/extractHandler.ts
var StagehandExtractHandler = class {
  constructor({
    stagehand,
    logger,
    waitForSettledDom,
    startDomDebug,
    cleanupDomDebug,
    llmProvider,
    llmClient,
    verbose
  }) {
    this.stagehand = stagehand;
    this.logger = logger;
    this.waitForSettledDom = waitForSettledDom;
    this.startDomDebug = startDomDebug;
    this.cleanupDomDebug = cleanupDomDebug;
    this.llmProvider = llmProvider;
    this.llmClient = llmClient;
    this.verbose = verbose;
  }
  extract(_0) {
    return __async(this, arguments, function* ({
      instruction,
      schema,
      progress = "",
      content = {},
      chunksSeen = [],
      llmClient,
      requestId,
      domSettleTimeoutMs
    }) {
      this.logger({
        category: "extraction",
        message: "starting extraction",
        level: 1,
        auxiliary: {
          instruction: {
            value: instruction,
            type: "string"
          }
        }
      });
      yield this.waitForSettledDom(domSettleTimeoutMs);
      yield this.startDomDebug();
      const { outputString, chunk, chunks } = yield this.stagehand.page.evaluate(
        (chunksSeen2) => window.processDom(chunksSeen2 != null ? chunksSeen2 : []),
        chunksSeen
      );
      this.logger({
        category: "extraction",
        message: "received output from processDom.",
        auxiliary: {
          chunk: {
            value: chunk.toString(),
            type: "integer"
          },
          chunks_left: {
            value: (chunks.length - chunksSeen.length).toString(),
            type: "integer"
          },
          chunks_total: {
            value: chunks.length.toString(),
            type: "integer"
          }
        }
      });
      const extractionResponse = yield extract({
        instruction,
        progress,
        previouslyExtractedContent: content,
        domElements: outputString,
        schema,
        llmClient,
        chunksSeen: chunksSeen.length,
        chunksTotal: chunks.length,
        requestId
      });
      const _a = extractionResponse, {
        metadata: { progress: newProgress, completed }
      } = _a, output = __objRest(_a, [
        "metadata"
      ]);
      yield this.cleanupDomDebug();
      this.logger({
        category: "extraction",
        message: "received extraction response",
        auxiliary: {
          extraction_response: {
            value: JSON.stringify(extractionResponse),
            type: "object"
          }
        }
      });
      chunksSeen.push(chunk);
      if (completed || chunksSeen.length === chunks.length) {
        this.logger({
          category: "extraction",
          message: "got response",
          auxiliary: {
            extraction_response: {
              value: JSON.stringify(extractionResponse),
              type: "object"
            }
          }
        });
        return output;
      } else {
        this.logger({
          category: "extraction",
          message: "continuing extraction",
          auxiliary: {
            extraction_response: {
              value: JSON.stringify(extractionResponse),
              type: "object"
            }
          }
        });
        yield this.waitForSettledDom(domSettleTimeoutMs);
        return this.extract({
          instruction,
          schema,
          progress: newProgress,
          content: output,
          chunksSeen,
          llmClient,
          domSettleTimeoutMs
        });
      }
    });
  }
};

// lib/handlers/observeHandler.ts
var StagehandObserveHandler = class {
  constructor({
    stagehand,
    logger,
    waitForSettledDom,
    startDomDebug,
    cleanupDomDebug,
    llmProvider,
    verbose,
    llmClient
  }) {
    this.stagehand = stagehand;
    this.logger = logger;
    this.waitForSettledDom = waitForSettledDom;
    this.startDomDebug = startDomDebug;
    this.cleanupDomDebug = cleanupDomDebug;
    this.llmProvider = llmProvider;
    this.verbose = verbose;
    this.llmClient = llmClient;
    this.observations = {};
  }
  _recordObservation(instruction, result) {
    return __async(this, null, function* () {
      const id = generateId(instruction);
      this.observations[id] = { result, instruction };
      return id;
    });
  }
  observe(_0) {
    return __async(this, arguments, function* ({
      instruction,
      useVision,
      fullPage,
      llmClient,
      requestId,
      domSettleTimeoutMs
    }) {
      if (!instruction) {
        instruction = `Find elements that can be used for any future actions in the page. These may be navigation links, related pages, section/subsection links, buttons, or other interactive elements. Be comprehensive: if there are multiple elements that may be relevant for future actions, return all of them.`;
      }
      this.logger({
        category: "observation",
        message: "starting observation",
        level: 1,
        auxiliary: {
          instruction: {
            value: instruction,
            type: "string"
          }
        }
      });
      yield this.waitForSettledDom(domSettleTimeoutMs);
      yield this.startDomDebug();
      let { outputString, selectorMap } = yield this.stagehand.page.evaluate(
        (fullPage2) => fullPage2 ? window.processAllOfDom() : window.processDom([]),
        fullPage
      );
      let annotatedScreenshot;
      if (useVision === true) {
        if (!llmClient.hasVision) {
          this.logger({
            category: "observation",
            message: "Model does not support vision. Skipping vision processing.",
            level: 1,
            auxiliary: {
              model: {
                value: llmClient.modelName,
                type: "string"
              }
            }
          });
        } else {
          const screenshotService = new ScreenshotService(
            this.stagehand.page,
            selectorMap,
            this.verbose,
            this.logger
          );
          annotatedScreenshot = yield screenshotService.getAnnotatedScreenshot(fullPage);
          outputString = "n/a. use the image to find the elements.";
        }
      }
      const observationResponse = yield observe({
        instruction,
        domElements: outputString,
        llmClient,
        image: annotatedScreenshot,
        requestId
      });
      const elementsWithSelectors = observationResponse.elements.map(
        (element) => {
          const _a = element, { elementId } = _a, rest = __objRest(_a, ["elementId"]);
          return __spreadProps(__spreadValues({}, rest), {
            selector: `xpath=${selectorMap[elementId][0]}`
          });
        }
      );
      yield this.cleanupDomDebug();
      this.logger({
        category: "observation",
        message: "found elements",
        level: 1,
        auxiliary: {
          elements: {
            value: JSON.stringify(elementsWithSelectors),
            type: "object"
          }
        }
      });
      yield this._recordObservation(instruction, elementsWithSelectors);
      return elementsWithSelectors;
    });
  }
};

// lib/llm/OpenAIClient.ts
var import_openai = __toESM(require("openai"));
var import_zod2 = require("openai/helpers/zod");
var OpenAIClient = class extends LLMClient {
  constructor(logger, enableCaching = false, cache, modelName, clientOptions) {
    super(modelName);
    this.client = new import_openai.default(clientOptions);
    this.logger = logger;
    this.cache = cache;
    this.enableCaching = enableCaching;
    this.modelName = modelName;
  }
  createChatCompletion(options) {
    return __async(this, null, function* () {
      const _a = options, { image: _ } = _a, optionsWithoutImage = __objRest(_a, ["image"]);
      this.logger({
        category: "openai",
        message: "creating chat completion",
        level: 1,
        auxiliary: {
          options: {
            value: JSON.stringify(optionsWithoutImage),
            type: "object"
          },
          modelName: {
            value: this.modelName,
            type: "string"
          }
        }
      });
      const cacheOptions = {
        model: this.modelName,
        messages: options.messages,
        temperature: options.temperature,
        top_p: options.top_p,
        frequency_penalty: options.frequency_penalty,
        presence_penalty: options.presence_penalty,
        image: options.image,
        response_model: options.response_model
      };
      if (this.enableCaching) {
        const cachedResponse = yield this.cache.get(
          cacheOptions,
          options.requestId
        );
        if (cachedResponse) {
          this.logger({
            category: "llm_cache",
            message: "LLM cache hit - returning cached response",
            level: 1,
            auxiliary: {
              requestId: {
                value: options.requestId,
                type: "string"
              },
              cachedResponse: {
                value: JSON.stringify(cachedResponse),
                type: "object"
              }
            }
          });
          return cachedResponse;
        } else {
          this.logger({
            category: "llm_cache",
            message: "LLM cache miss - no cached response found",
            level: 1,
            auxiliary: {
              requestId: {
                value: options.requestId,
                type: "string"
              }
            }
          });
        }
      }
      if (options.image) {
        const screenshotMessage = {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${options.image.buffer.toString("base64")}`
              }
            },
            ...options.image.description ? [{ type: "text", text: options.image.description }] : []
          ]
        };
        options.messages = [...options.messages, screenshotMessage];
      }
      const _b = __spreadProps(__spreadValues({}, options), {
        model: this.modelName
      }), { image, response_model, requestId } = _b, openAiOptions = __objRest(_b, ["image", "response_model", "requestId"]);
      let responseFormat = void 0;
      if (options.response_model) {
        responseFormat = (0, import_zod2.zodResponseFormat)(
          options.response_model.schema,
          options.response_model.name
        );
      }
      this.logger({
        category: "openai",
        message: "creating chat completion",
        level: 1,
        auxiliary: {
          openAiOptions: {
            value: JSON.stringify(openAiOptions),
            type: "object"
          }
        }
      });
      const response = yield this.client.chat.completions.create(__spreadProps(__spreadValues({}, openAiOptions), {
        response_format: responseFormat
      }));
      this.logger({
        category: "openai",
        message: "response",
        level: 1,
        auxiliary: {
          response: {
            value: JSON.stringify(response),
            type: "object"
          },
          requestId: {
            value: options.requestId,
            type: "string"
          }
        }
      });
      if (response_model) {
        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData);
        if (this.enableCaching) {
          this.cache.set(
            cacheOptions,
            __spreadValues({}, parsedData),
            options.requestId
          );
        }
        return __spreadValues({}, parsedData);
      }
      if (this.enableCaching) {
        this.logger({
          category: "llm_cache",
          message: "caching response",
          level: 1,
          auxiliary: {
            requestId: {
              value: options.requestId,
              type: "string"
            },
            cacheOptions: {
              value: JSON.stringify(cacheOptions),
              type: "object"
            },
            response: {
              value: JSON.stringify(response),
              type: "object"
            }
          }
        });
        this.cache.set(cacheOptions, response, options.requestId);
      }
      return response;
    });
  }
};

// lib/llm/AnthropicClient.ts
var import_sdk = __toESM(require("@anthropic-ai/sdk"));
var import_zod_to_json_schema = require("zod-to-json-schema");
var AnthropicClient = class extends LLMClient {
  constructor(logger, enableCaching = false, cache, modelName, clientOptions) {
    super(modelName);
    this.client = new import_sdk.default(clientOptions);
    this.logger = logger;
    this.cache = cache;
    this.enableCaching = enableCaching;
    this.modelName = modelName;
  }
  createChatCompletion(options) {
    return __async(this, null, function* () {
      var _b, _c, _d, _e, _f, _g, _h;
      const _a = options, { image: _ } = _a, optionsWithoutImage = __objRest(_a, ["image"]);
      this.logger({
        category: "anthropic",
        message: "creating chat completion",
        level: 1,
        auxiliary: {
          options: {
            value: JSON.stringify(optionsWithoutImage),
            type: "object"
          }
        }
      });
      const cacheOptions = {
        model: this.modelName,
        messages: options.messages,
        temperature: options.temperature,
        image: options.image,
        response_model: options.response_model,
        tools: options.tools,
        retries: options.retries
      };
      if (this.enableCaching) {
        const cachedResponse = yield this.cache.get(
          cacheOptions,
          options.requestId
        );
        if (cachedResponse) {
          this.logger({
            category: "llm_cache",
            message: "LLM cache hit - returning cached response",
            level: 1,
            auxiliary: {
              cachedResponse: {
                value: JSON.stringify(cachedResponse),
                type: "object"
              },
              requestId: {
                value: options.requestId,
                type: "string"
              },
              cacheOptions: {
                value: JSON.stringify(cacheOptions),
                type: "object"
              }
            }
          });
          return cachedResponse;
        } else {
          this.logger({
            category: "llm_cache",
            message: "LLM cache miss - no cached response found",
            level: 1,
            auxiliary: {
              cacheOptions: {
                value: JSON.stringify(cacheOptions),
                type: "object"
              },
              requestId: {
                value: options.requestId,
                type: "string"
              }
            }
          });
        }
      }
      const systemMessage = options.messages.find((msg) => msg.role === "system");
      const userMessages = options.messages.filter(
        (msg) => msg.role !== "system"
      );
      if (options.image) {
        const screenshotMessage = {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: options.image.buffer.toString("base64")
              }
            },
            ...options.image.description ? [{ type: "text", text: options.image.description }] : []
          ]
        };
        options.messages = [...options.messages, screenshotMessage];
      }
      let anthropicTools = (_b = options.tools) == null ? void 0 : _b.map((tool) => {
        if (tool.type === "function") {
          return {
            name: tool.function.name,
            description: tool.function.description,
            input_schema: {
              type: "object",
              properties: tool.function.parameters.properties,
              required: tool.function.parameters.required
            }
          };
        }
        return tool;
      });
      let toolDefinition;
      if (options.response_model) {
        const jsonSchema = (0, import_zod_to_json_schema.zodToJsonSchema)(options.response_model.schema);
        const schemaProperties = ((_d = (_c = jsonSchema.definitions) == null ? void 0 : _c.MySchema) == null ? void 0 : _d.properties) || jsonSchema.properties;
        const schemaRequired = ((_f = (_e = jsonSchema.definitions) == null ? void 0 : _e.MySchema) == null ? void 0 : _f.required) || jsonSchema.required;
        toolDefinition = {
          name: "print_extracted_data",
          description: "Prints the extracted data based on the provided schema.",
          input_schema: {
            type: "object",
            properties: schemaProperties,
            required: schemaRequired
          }
        };
      }
      if (toolDefinition) {
        anthropicTools = anthropicTools != null ? anthropicTools : [];
        anthropicTools.push(toolDefinition);
      }
      const response = yield this.client.messages.create({
        model: this.modelName,
        max_tokens: options.maxTokens || 3e3,
        messages: userMessages.map((msg) => ({
          role: msg.role,
          content: msg.content
        })),
        tools: anthropicTools,
        system: systemMessage == null ? void 0 : systemMessage.content,
        temperature: options.temperature
      });
      this.logger({
        category: "anthropic",
        message: "response",
        level: 1,
        auxiliary: {
          response: {
            value: JSON.stringify(response),
            type: "object"
          },
          requestId: {
            value: options.requestId,
            type: "string"
          }
        }
      });
      const transformedResponse = {
        id: response.id,
        object: "chat.completion",
        created: Date.now(),
        model: response.model,
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content: ((_g = response.content.find((c) => c.type === "text")) == null ? void 0 : _g.text) || null,
              tool_calls: response.content.filter((c) => c.type === "tool_use").map((toolUse) => ({
                id: toolUse.id,
                type: "function",
                function: {
                  name: toolUse.name,
                  arguments: JSON.stringify(toolUse.input)
                }
              }))
            },
            finish_reason: response.stop_reason
          }
        ],
        usage: {
          prompt_tokens: response.usage.input_tokens,
          completion_tokens: response.usage.output_tokens,
          total_tokens: response.usage.input_tokens + response.usage.output_tokens
        }
      };
      this.logger({
        category: "anthropic",
        message: "transformed response",
        level: 1,
        auxiliary: {
          transformedResponse: {
            value: JSON.stringify(transformedResponse),
            type: "object"
          },
          requestId: {
            value: options.requestId,
            type: "string"
          }
        }
      });
      if (options.response_model) {
        const toolUse = response.content.find((c) => c.type === "tool_use");
        if (toolUse && "input" in toolUse) {
          const result = toolUse.input;
          if (this.enableCaching) {
            this.cache.set(cacheOptions, result, options.requestId);
          }
          return result;
        } else {
          if (!options.retries || options.retries < 5) {
            return this.createChatCompletion(__spreadProps(__spreadValues({}, options), {
              retries: ((_h = options.retries) != null ? _h : 0) + 1
            }));
          }
          this.logger({
            category: "anthropic",
            message: "error creating chat completion",
            level: 1,
            auxiliary: {
              requestId: {
                value: options.requestId,
                type: "string"
              }
            }
          });
          throw new Error(
            "Create Chat Completion Failed: No tool use with input in response"
          );
        }
      }
      if (this.enableCaching) {
        this.cache.set(cacheOptions, transformedResponse, options.requestId);
        this.logger({
          category: "anthropic",
          message: "cached response",
          level: 1,
          auxiliary: {
            requestId: {
              value: options.requestId,
              type: "string"
            },
            transformedResponse: {
              value: JSON.stringify(transformedResponse),
              type: "object"
            },
            cacheOptions: {
              value: JSON.stringify(cacheOptions),
              type: "object"
            }
          }
        });
      }
      return transformedResponse;
    });
  }
};

// lib/cache/LLMCache.ts
var LLMCache = class _LLMCache extends BaseCache {
  constructor(logger, cacheDir, cacheFile) {
    super(logger, cacheDir, cacheFile || "llm_calls.json");
  }
  /**
   * Overrides the get method to track used hashes by requestId.
   * @param options - The options used to generate the cache key.
   * @param requestId - The identifier for the current request.
   * @returns The cached data if available, otherwise null.
   */
  get(options, requestId) {
    return __async(this, null, function* () {
      const data = yield __superGet(_LLMCache.prototype, this, "get").call(this, options, requestId);
      return data;
    });
  }
  /**
   * Overrides the set method to include cache cleanup logic.
   * @param options - The options used to generate the cache key.
   * @param data - The data to be cached.
   * @param requestId - The identifier for the current request.
   */
  set(options, data, requestId) {
    return __async(this, null, function* () {
      yield __superGet(_LLMCache.prototype, this, "set").call(this, options, data, requestId);
      this.logger({
        category: "llm_cache",
        message: "Cache miss - saved new response",
        level: 1
      });
    });
  }
};

// lib/llm/LLMProvider.ts
var LLMProvider = class {
  constructor(logger, enableCaching) {
    this.modelToProviderMap = {
      "gpt-4o": "openai",
      "gpt-4o-mini": "openai",
      "gpt-4o-2024-08-06": "openai",
      "claude-3-5-sonnet-latest": "anthropic",
      "claude-3-5-sonnet-20240620": "anthropic",
      "claude-3-5-sonnet-20241022": "anthropic"
    };
    this.logger = logger;
    this.enableCaching = enableCaching;
    this.cache = enableCaching ? new LLMCache(logger) : void 0;
  }
  cleanRequestCache(requestId) {
    if (!this.enableCaching) {
      return;
    }
    this.logger({
      category: "llm_cache",
      message: "cleaning up cache",
      level: 1,
      auxiliary: {
        requestId: {
          value: requestId,
          type: "string"
        }
      }
    });
    this.cache.deleteCacheForRequestId(requestId);
  }
  getClient(modelName, clientOptions) {
    const provider = this.modelToProviderMap[modelName];
    if (!provider) {
      throw new Error(`Unsupported model: ${modelName}`);
    }
    switch (provider) {
      case "openai":
        return new OpenAIClient(
          this.logger,
          this.enableCaching,
          this.cache,
          modelName,
          clientOptions
        );
      case "anthropic":
        return new AnthropicClient(
          this.logger,
          this.enableCaching,
          this.cache,
          modelName,
          clientOptions
        );
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }
};

// lib/index.ts
require("dotenv").config({ path: ".env" });
var DEFAULT_MODEL_NAME = "gpt-4o";
function getBrowser(apiKey, projectId, env = "LOCAL", headless = false, logger, browserbaseSessionCreateParams, browserbaseResumeSessionID) {
  return __async(this, null, function* () {
    if (env === "BROWSERBASE") {
      if (!apiKey) {
        logger({
          category: "init",
          message: "BROWSERBASE_API_KEY is required to use BROWSERBASE env. Defaulting to LOCAL.",
          level: 0
        });
        env = "LOCAL";
      }
      if (!projectId) {
        logger({
          category: "init",
          message: "BROWSERBASE_PROJECT_ID is required for some Browserbase features that may not work without it.",
          level: 1
        });
      }
    }
    if (env === "BROWSERBASE") {
      if (!apiKey) {
        throw new Error("BROWSERBASE_API_KEY is required.");
      }
      let debugUrl = void 0;
      let sessionUrl = void 0;
      let sessionId;
      let connectUrl;
      const browserbase = new import_sdk2.Browserbase({
        apiKey
      });
      if (browserbaseResumeSessionID) {
        try {
          const sessionStatus = yield browserbase.sessions.retrieve(
            browserbaseResumeSessionID
          );
          if (sessionStatus.status !== "RUNNING") {
            throw new Error(
              `Session ${browserbaseResumeSessionID} is not running (status: ${sessionStatus.status})`
            );
          }
          sessionId = browserbaseResumeSessionID;
          connectUrl = `wss://connect.browserbase.com?apiKey=${apiKey}&sessionId=${sessionId}`;
          logger({
            category: "init",
            message: "resuming existing browserbase session...",
            level: 1,
            auxiliary: {
              sessionId: {
                value: sessionId,
                type: "string"
              }
            }
          });
        } catch (error) {
          logger({
            category: "init",
            message: "failed to resume session",
            level: 1,
            auxiliary: {
              error: {
                value: error.message,
                type: "string"
              },
              trace: {
                value: error.stack,
                type: "string"
              }
            }
          });
          throw error;
        }
      } else {
        logger({
          category: "init",
          message: "creating new browserbase session...",
          level: 0
        });
        if (!projectId) {
          throw new Error(
            "BROWSERBASE_PROJECT_ID is required for new Browserbase sessions."
          );
        }
        const session = yield browserbase.sessions.create(__spreadValues({
          projectId
        }, browserbaseSessionCreateParams));
        sessionId = session.id;
        connectUrl = session.connectUrl;
        logger({
          category: "init",
          message: "created new browserbase session",
          level: 1,
          auxiliary: {
            sessionId: {
              value: sessionId,
              type: "string"
            }
          }
        });
      }
      const browser = yield import_test.chromium.connectOverCDP(connectUrl);
      const { debuggerUrl } = yield browserbase.sessions.debug(sessionId);
      debugUrl = debuggerUrl;
      sessionUrl = `https://www.browserbase.com/sessions/${sessionId}`;
      logger({
        category: "init",
        message: browserbaseResumeSessionID ? "browserbase session resumed" : "browserbase session started",
        level: 0,
        auxiliary: {
          sessionUrl: {
            value: sessionUrl,
            type: "string"
          },
          debugUrl: {
            value: debugUrl,
            type: "string"
          },
          sessionId: {
            value: sessionId,
            type: "string"
          }
        }
      });
      const context = browser.contexts()[0];
      return { browser, context, debugUrl, sessionUrl };
    } else {
      logger({
        category: "init",
        message: "launching local browser",
        level: 0,
        auxiliary: {
          headless: {
            value: headless.toString(),
            type: "boolean"
          }
        }
      });
      const tmpDirPath = import_path2.default.join(import_os.default.tmpdir(), "stagehand");
      if (!import_fs2.default.existsSync(tmpDirPath)) {
        import_fs2.default.mkdirSync(tmpDirPath, { recursive: true });
      }
      const tmpDir = import_fs2.default.mkdtempSync(import_path2.default.join(tmpDirPath, "ctx_"));
      import_fs2.default.mkdirSync(import_path2.default.join(tmpDir, "userdir/Default"), { recursive: true });
      const defaultPreferences = {
        plugins: {
          always_open_pdf_externally: true
        }
      };
      import_fs2.default.writeFileSync(
        import_path2.default.join(tmpDir, "userdir/Default/Preferences"),
        JSON.stringify(defaultPreferences)
      );
      const downloadsPath = import_path2.default.join(process.cwd(), "downloads");
      import_fs2.default.mkdirSync(downloadsPath, { recursive: true });
      const context = yield import_test.chromium.launchPersistentContext(
        import_path2.default.join(tmpDir, "userdir"),
        {
          acceptDownloads: true,
          headless,
          viewport: {
            width: 1250,
            height: 800
          },
          locale: "en-US",
          timezoneId: "America/New_York",
          deviceScaleFactor: 1,
          args: [
            "--enable-webgl",
            "--use-gl=swiftshader",
            "--enable-accelerated-2d-canvas",
            "--disable-blink-features=AutomationControlled",
            "--disable-web-security"
          ],
          bypassCSP: true,
          recordVideo: {
            dir: import_path2.default.join(process.cwd(), "videos"),
            size: {
              width: 1250,
              height: 800
            }
          }
        }
      );
      logger({
        category: "init",
        message: "local browser started successfully."
      });
      yield applyStealthScripts(context);
      return { context, contextPath: tmpDir };
    }
  });
}
function applyStealthScripts(context) {
  return __async(this, null, function* () {
    yield context.addInitScript(() => {
      Object.defineProperty(navigator, "webdriver", {
        get: () => void 0
      });
      Object.defineProperty(navigator, "languages", {
        get: () => ["en-US", "en"]
      });
      Object.defineProperty(navigator, "plugins", {
        get: () => [1, 2, 3, 4, 5]
      });
      delete window.__playwright;
      delete window.__pw_manual;
      delete window.__PW_inspect;
      Object.defineProperty(navigator, "headless", {
        get: () => false
      });
      const originalQuery = window.navigator.permissions.query;
      window.navigator.permissions.query = (parameters) => parameters.name === "notifications" ? Promise.resolve({
        state: Notification.permission
      }) : originalQuery(parameters);
    });
  });
}
var Stagehand = class {
  constructor({
    env,
    apiKey,
    projectId,
    verbose,
    debugDom,
    llmProvider,
    headless,
    logger,
    browserBaseSessionCreateParams,
    domSettleTimeoutMs,
    enableCaching,
    browserbaseResumeSessionID,
    modelName,
    modelClientOptions
  } = {
    env: "BROWSERBASE"
  }) {
    this.pending_logs_to_send_to_browserbase = [];
    this.is_processing_browserbase_logs = false;
    this.externalLogger = logger;
    this.logger = this.log.bind(this);
    this.enableCaching = enableCaching != null ? enableCaching : process.env.ENABLE_CACHING && process.env.ENABLE_CACHING === "true";
    this.llmProvider = llmProvider || new LLMProvider(this.logger, this.enableCaching);
    this.env = env;
    this.apiKey = apiKey != null ? apiKey : process.env.BROWSERBASE_API_KEY;
    this.projectId = projectId != null ? projectId : process.env.BROWSERBASE_PROJECT_ID;
    this.verbose = verbose != null ? verbose : 0;
    this.debugDom = debugDom != null ? debugDom : false;
    this.llmClient = this.llmProvider.getClient(
      modelName != null ? modelName : DEFAULT_MODEL_NAME,
      modelClientOptions
    );
    this.domSettleTimeoutMs = domSettleTimeoutMs != null ? domSettleTimeoutMs : 3e4;
    this.headless = headless != null ? headless : false;
    this.browserBaseSessionCreateParams = browserBaseSessionCreateParams;
    this.browserbaseResumeSessionID = browserbaseResumeSessionID;
  }
  init() {
    return __async(this, arguments, function* ({
      modelName,
      modelClientOptions,
      domSettleTimeoutMs
    } = {}) {
      const llmClient = modelName ? this.llmProvider.getClient(modelName, modelClientOptions) : this.llmClient;
      const { context, debugUrl, sessionUrl, contextPath } = yield getBrowser(
        this.apiKey,
        this.projectId,
        this.env,
        this.headless,
        this.logger,
        this.browserBaseSessionCreateParams,
        this.browserbaseResumeSessionID
      ).catch((e) => {
        console.error("Error in init:", e);
        return {
          context: void 0,
          debugUrl: void 0,
          sessionUrl: void 0
        };
      });
      this.contextPath = contextPath;
      this.context = context;
      this.page = context.pages()[0];
      yield this.page.waitForLoadState("domcontentloaded");
      yield this._waitForSettledDom();
      this.domSettleTimeoutMs = domSettleTimeoutMs != null ? domSettleTimeoutMs : this.domSettleTimeoutMs;
      const originalGoto = this.page.goto.bind(this.page);
      this.page.goto = (url, options) => __async(this, null, function* () {
        const result = yield originalGoto(url, options);
        if (this.debugDom) {
          yield this.page.evaluate(() => window.showChunks = this.debugDom);
        }
        yield this.page.waitForLoadState("domcontentloaded");
        yield this._waitForSettledDom();
        return result;
      });
      if (this.headless) {
        yield this.page.setViewportSize({ width: 1280, height: 720 });
      }
      yield this.context.addInitScript({
        content: scriptContent
      });
      this.actHandler = new StagehandActHandler({
        stagehand: this,
        verbose: this.verbose,
        llmProvider: this.llmProvider,
        enableCaching: this.enableCaching,
        logger: this.logger,
        waitForSettledDom: this._waitForSettledDom.bind(this),
        startDomDebug: this.startDomDebug.bind(this),
        cleanupDomDebug: this.cleanupDomDebug.bind(this),
        llmClient
      });
      this.extractHandler = new StagehandExtractHandler({
        stagehand: this,
        logger: this.logger,
        waitForSettledDom: this._waitForSettledDom.bind(this),
        startDomDebug: this.startDomDebug.bind(this),
        cleanupDomDebug: this.cleanupDomDebug.bind(this),
        llmProvider: this.llmProvider,
        verbose: this.verbose,
        llmClient
      });
      this.observeHandler = new StagehandObserveHandler({
        stagehand: this,
        logger: this.logger,
        waitForSettledDom: this._waitForSettledDom.bind(this),
        startDomDebug: this.startDomDebug.bind(this),
        cleanupDomDebug: this.cleanupDomDebug.bind(this),
        llmProvider: this.llmProvider,
        verbose: this.verbose,
        llmClient
      });
      this.llmClient = llmClient;
      return { debugUrl, sessionUrl };
    });
  }
  initFromPage(_0) {
    return __async(this, arguments, function* ({
      page,
      modelName,
      modelClientOptions
    }) {
      this.page = page;
      this.context = page.context();
      this.llmClient = modelName ? this.llmProvider.getClient(modelName, modelClientOptions) : this.llmClient;
      const originalGoto = this.page.goto.bind(this.page);
      this.page.goto = (url, options) => __async(this, null, function* () {
        const result = yield originalGoto(url, options);
        if (this.debugDom) {
          yield this.page.evaluate(() => window.showChunks = this.debugDom);
        }
        yield this.page.waitForLoadState("domcontentloaded");
        yield this._waitForSettledDom();
        return result;
      });
      if (this.headless) {
        yield this.page.setViewportSize({ width: 1280, height: 720 });
      }
      yield this.context.addInitScript({
        content: scriptContent
      });
      return { context: this.context };
    });
  }
  log(logObj) {
    logObj.level = logObj.level || 1;
    if (this.externalLogger) {
      this.externalLogger(logObj);
    } else {
      const logMessage = logLineToString(logObj);
      console.log(logMessage);
    }
    this.pending_logs_to_send_to_browserbase.push(__spreadProps(__spreadValues({}, logObj), {
      id: (0, import_crypto2.randomUUID)()
    }));
    this._run_browserbase_log_processing_cycle();
  }
  _run_browserbase_log_processing_cycle() {
    return __async(this, null, function* () {
      if (this.is_processing_browserbase_logs) {
        return;
      }
      this.is_processing_browserbase_logs = true;
      const pending_logs = [...this.pending_logs_to_send_to_browserbase];
      for (const logObj of pending_logs) {
        yield this._log_to_browserbase(logObj);
      }
      this.is_processing_browserbase_logs = false;
    });
  }
  _log_to_browserbase(logObj) {
    return __async(this, null, function* () {
      logObj.level = logObj.level || 1;
      if (!this.page) {
        return;
      }
      if (this.verbose >= logObj.level) {
        yield this.page.evaluate((logObj2) => {
          const logMessage = logLineToString(logObj2);
          if (logObj2.message.toLowerCase().includes("trace") || logObj2.message.toLowerCase().includes("error:")) {
            console.error(logMessage);
          } else {
            console.log(logMessage);
          }
        }, logObj).then(() => {
          this.pending_logs_to_send_to_browserbase = this.pending_logs_to_send_to_browserbase.filter(
            (log) => log.id !== logObj.id
          );
        }).catch((e) => {
        });
      }
    });
  }
  _waitForSettledDom(timeoutMs) {
    return __async(this, null, function* () {
      try {
        const timeout = timeoutMs != null ? timeoutMs : this.domSettleTimeoutMs;
        let timeoutHandle;
        const timeoutPromise = new Promise((resolve, reject) => {
          timeoutHandle = setTimeout(() => {
            this.log({
              category: "dom",
              message: "DOM settle timeout exceeded, continuing anyway",
              level: 1,
              auxiliary: {
                timeout_ms: {
                  value: timeout.toString(),
                  type: "integer"
                }
              }
            });
            resolve();
          }, timeout);
        });
        try {
          yield Promise.race([
            this.page.evaluate(() => {
              return new Promise((resolve) => {
                if (typeof window.waitForDomSettle === "function") {
                  window.waitForDomSettle().then(resolve);
                } else {
                  console.warn(
                    "waitForDomSettle is not defined, considering DOM as settled"
                  );
                  resolve();
                }
              });
            }),
            this.page.waitForLoadState("domcontentloaded"),
            this.page.waitForSelector("body"),
            timeoutPromise
          ]);
        } finally {
          clearTimeout(timeoutHandle);
        }
      } catch (e) {
        this.log({
          category: "dom",
          message: "Error in waitForSettledDom",
          level: 1,
          auxiliary: {
            error: {
              value: e.message,
              type: "string"
            },
            trace: {
              value: e.stack,
              type: "string"
            }
          }
        });
      }
    });
  }
  startDomDebug() {
    return __async(this, null, function* () {
      try {
        yield this.page.evaluate(() => {
          if (typeof window.debugDom === "function") {
            window.debugDom();
          } else {
            this.log({
              category: "dom",
              message: "debugDom is not defined",
              level: 1
            });
          }
        }).catch(() => {
        });
      } catch (e) {
        this.log({
          category: "dom",
          message: "Error in startDomDebug",
          level: 1,
          auxiliary: {
            error: {
              value: e.message,
              type: "string"
            },
            trace: {
              value: e.stack,
              type: "string"
            }
          }
        });
      }
    });
  }
  cleanupDomDebug() {
    return __async(this, null, function* () {
      if (this.debugDom) {
        yield this.page.evaluate(() => window.cleanupDebug()).catch(() => {
        });
      }
    });
  }
  act(_0) {
    return __async(this, arguments, function* ({
      action,
      modelName,
      modelClientOptions,
      useVision = "fallback",
      variables = {},
      domSettleTimeoutMs
    }) {
      if (!this.actHandler) {
        throw new Error("Act handler not initialized");
      }
      useVision = useVision != null ? useVision : "fallback";
      const requestId = Math.random().toString(36).substring(2);
      const llmClient = modelName ? this.llmProvider.getClient(modelName, modelClientOptions) : this.llmClient;
      this.log({
        category: "act",
        message: "running act",
        level: 1,
        auxiliary: {
          action: {
            value: action,
            type: "string"
          },
          requestId: {
            value: requestId,
            type: "string"
          },
          modelName: {
            value: llmClient.modelName,
            type: "string"
          }
        }
      });
      if (variables) {
        this.variables = __spreadValues(__spreadValues({}, this.variables), variables);
      }
      return this.actHandler.act({
        action,
        llmClient,
        chunksSeen: [],
        useVision,
        verifierUseVision: useVision !== false,
        requestId,
        variables,
        previousSelectors: [],
        skipActionCacheForThisStep: false,
        domSettleTimeoutMs
      }).catch((e) => {
        this.log({
          category: "act",
          message: "error acting",
          level: 1,
          auxiliary: {
            error: {
              value: e.message,
              type: "string"
            },
            trace: {
              value: e.stack,
              type: "string"
            }
          }
        });
        return {
          success: false,
          message: `Internal error: Error acting: ${e.message}`,
          action
        };
      });
    });
  }
  extract(_0) {
    return __async(this, arguments, function* ({
      instruction,
      schema,
      modelName,
      modelClientOptions,
      domSettleTimeoutMs
    }) {
      if (!this.extractHandler) {
        throw new Error("Extract handler not initialized");
      }
      const requestId = Math.random().toString(36).substring(2);
      const llmClient = modelName ? this.llmProvider.getClient(modelName, modelClientOptions) : this.llmClient;
      this.logger({
        category: "extract",
        message: "running extract",
        level: 1,
        auxiliary: {
          instruction: {
            value: instruction,
            type: "string"
          },
          requestId: {
            value: requestId,
            type: "string"
          },
          modelName: {
            value: llmClient.modelName,
            type: "string"
          }
        }
      });
      return this.extractHandler.extract({
        instruction,
        schema,
        llmClient,
        requestId,
        domSettleTimeoutMs
      }).catch((e) => {
        this.logger({
          category: "extract",
          message: "error extracting",
          level: 1,
          auxiliary: {
            error: {
              value: e.message,
              type: "string"
            },
            trace: {
              value: e.stack,
              type: "string"
            }
          }
        });
        if (this.enableCaching) {
          this.llmProvider.cleanRequestCache(requestId);
        }
        throw e;
      });
    });
  }
  observe(options) {
    return __async(this, null, function* () {
      var _a, _b;
      if (!this.observeHandler) {
        throw new Error("Observe handler not initialized");
      }
      const requestId = Math.random().toString(36).substring(2);
      const llmClient = (options == null ? void 0 : options.modelName) ? this.llmProvider.getClient(
        options.modelName,
        options.modelClientOptions
      ) : this.llmClient;
      this.logger({
        category: "observe",
        message: "running observe",
        level: 1,
        auxiliary: {
          instruction: {
            value: options == null ? void 0 : options.instruction,
            type: "string"
          },
          requestId: {
            value: requestId,
            type: "string"
          },
          modelName: {
            value: llmClient.modelName,
            type: "string"
          }
        }
      });
      return this.observeHandler.observe({
        instruction: (_a = options == null ? void 0 : options.instruction) != null ? _a : "Find actions that can be performed on this page.",
        llmClient,
        useVision: (_b = options == null ? void 0 : options.useVision) != null ? _b : false,
        fullPage: false,
        requestId,
        domSettleTimeoutMs: options == null ? void 0 : options.domSettleTimeoutMs
      }).catch((e) => {
        this.logger({
          category: "observe",
          message: "error observing",
          level: 1,
          auxiliary: {
            error: {
              value: e.message,
              type: "string"
            },
            trace: {
              value: e.stack,
              type: "string"
            },
            requestId: {
              value: requestId,
              type: "string"
            },
            instruction: {
              value: options == null ? void 0 : options.instruction,
              type: "string"
            }
          }
        });
        if (this.enableCaching) {
          this.llmProvider.cleanRequestCache(requestId);
        }
        throw e;
      });
    });
  }
  close() {
    return __async(this, null, function* () {
      yield this.context.close();
      if (this.contextPath) {
        try {
          import_fs2.default.rmSync(this.contextPath, { recursive: true, force: true });
        } catch (e) {
          console.error("Error deleting context directory:", e);
        }
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PlaywrightCommandException,
  PlaywrightCommandMethodNotSupportedException,
  Stagehand
});

# Agent Philosophy & Guidelines

**Project:** La Puck - Electro Hockey
**Version:** 1.0
**Date:** 2025-01-08
**Language:** Français (user is trilingual FR-Qc/EN-NY/ES-Cu)

---

## 🎯 Core Philosophy

### Strong Code, No Workarounds

**Principle:** Build it right or don't build it at all.

- ✅ **Use established libraries properly** - Don't reinvent the wheel
- ✅ **Stay close to official APIs** - If you're building something to make it work, you're doing it wrong
- ❌ **No hacky workarounds** - Fix the root cause, don't patch symptoms
- ❌ **No legacy baggage** - Delete unused code immediately after testing fails

**Example:**
- ❌ BAD: Building custom HTTP wrapper because requests isn't installed
- ✅ GOOD: Install requests properly via pip/venv
- ❌ BAD: Keeping old momentum-based prompt code "just in case"
- ✅ GOOD: Delete it after testing confirms new structure works better

---

## 🧹 Code Cleanliness

### Delete Fast, Keep Clean

**When code fails testing:**
1. Delete it immediately
2. Don't comment it out "for reference"
3. Don't move it to "archive" folders
4. Git history exists if you need it back

**When requirements change:**
1. Delete the old approach completely
2. Write new code from scratch
3. Don't try to "adapt" old code to new needs

**Example:**
- User says prompt structure doesn't work
- ❌ BAD: Keep old `SUNO_PROMPT_STRUCTURE_V2.md` "for reference"
- ✅ GOOD: Delete it, write new approach from scratch

---

## 📚 Library Usage

### Use Tools Properly

**Rule:** If a library exists for the task, use it. Don't build custom solutions.

**Common Tasks:**

| Task | ✅ Use This | ❌ Not This |
|------|------------|-------------|
| HTTP requests | `requests` library | Custom urllib wrapper |
| JSON parsing | `json` built-in | String manipulation |
| File operations | `pathlib` or `os.path` | String concatenation |
| Date/time | `datetime` | Manual parsing |
| API calls | Official SDK when available | Custom implementations |

**If library installation fails:**
- ✅ Fix the installation problem (pip, venv, PATH)
- ❌ Don't build workaround code

---

## 🔧 Dependency Management

### Proper Environment Setup

**Virtual Environments:**
- Use `venv` for Python projects
- Keep `requirements.txt` updated
- Don't install globally unless necessary

**When things break:**
- Fix the environment, don't work around it
- Document proper setup in README
- Provide clear installation instructions

**Example:**
- `requests` module not found
- ❌ BAD: Use `urllib` instead to avoid installing
- ✅ GOOD: Install requests: `pip install requests`
- ✅ GOOD: Document in README: "Run `pip install -r requirements.txt`"

---

## 🧪 Testing Philosophy

### Test Fast, Decide Fast

**When testing approaches:**
1. Create minimal test cases
2. Run tests quickly
3. Pick winner immediately
4. Delete losers immediately

**Example - Suno Prompting:**
- Problem: Repetitive sections, short duration
- Solution: Test 5 different strategies
- Process:
  - ✅ Create 5 minimal test prompts
  - ✅ Submit all at once
  - ✅ Listen, pick winner
  - ✅ Delete 4 losing strategies
  - ✅ Implement winner in main code

**Don't:**
- ❌ Keep all 5 strategies "as options"
- ❌ Build system to "switch between strategies"
- ❌ Preserve failed tests "for documentation"

---

## 📝 Documentation

### Document Decisions, Not Dead Code

**What to document:**
- ✅ Why current approach was chosen
- ✅ What problem it solves
- ✅ How to use it
- ✅ Setup/installation steps

**What NOT to document:**
- ❌ Failed approaches (delete them)
- ❌ "Alternative methods" that don't work
- ❌ Workarounds for broken environments
- ❌ Historical code evolution

**Example:**
- Current docs explain Electro Hockey and standard EDM structure
- ❌ BAD: Keep old "momentum-based sections" docs
- ✅ GOOD: One doc explaining current working approach

---

## 🎨 API Integration

### Use Official Methods

**When integrating external services:**

1. **Read official documentation first**
2. **Use official SDKs/libraries when available**
3. **Follow API best practices**
4. **Don't build custom wrappers**

**Example - Suno API:**
- ✅ Use their official endpoints
- ✅ Follow their authentication method
- ✅ Use their response format
- ❌ Don't build custom "simplified" wrapper

**Example - Claude API:**
- ✅ Use Anthropic's official format
- ✅ Follow their message structure
- ✅ Handle errors their way
- ❌ Don't create custom retry logic (use their recommendations)

---

## 🚀 Deployment Philosophy

### Ship What Works

**Production code should:**
- ✅ Use stable, well-maintained libraries
- ✅ Have clear, simple dependencies
- ✅ Work out of the box after setup
- ✅ Fail gracefully with clear errors

**Production code should NOT:**
- ❌ Require workarounds to run
- ❌ Have commented-out "alternative" code
- ❌ Include unused imports/functions
- ❌ Depend on experimental features

---

## 🔄 Iteration Process

### How to Improve Code

**When user reports problem:**

1. **Understand root cause**
   - Don't patch symptoms
   - Find why it's actually failing

2. **Research proper solution**
   - Check library docs
   - Find official best practices
   - Look for similar examples

3. **Implement cleanly**
   - Write new code from scratch if needed
   - Don't try to "fix" broken approach
   - Use proper tools/libraries

4. **Test thoroughly**
   - Verify it solves actual problem
   - Check edge cases

5. **Delete old code**
   - Remove failed approach
   - Update docs
   - Clean up files

**Example - Prompt Structure:**
1. User: "Prompts don't work, no variety"
2. Root cause: Suno doesn't understand abstract section names
3. Research: Check Suno best practices (use standard music terms)
4. Implement: Rewrite AI planner with Intro/Verse/Drop structure
5. Test: Generate new prompt, submit to Suno
6. Delete: Remove old momentum-based code entirely

---

## 📊 Project Structure

### Keep It Clean

**File organization:**
- ✅ Clear folder names
- ✅ One purpose per file
- ✅ Delete unused folders immediately
- ✅ README in each major folder

**What to avoid:**
- ❌ `old_version/` folders
- ❌ `backup_` files
- ❌ `test_` scripts that aren't real tests
- ❌ Commented-out code blocks

**Example:**
```
✅ GOOD:
project/
├── core/           # Core functionality
├── docs/           # Current documentation
└── season_2025-26/ # Current season

❌ BAD:
project/
├── core/
├── core_old/
├── core_backup/
├── docs/
├── docs_old/
├── season_2024-25/
├── season_2025-26/
└── tests_to_delete_later/
```

---

## 🎯 Summary: The Rules

1. **Strong code only** - No workarounds, use libraries properly
2. **Delete fast** - Failed code goes immediately, no archives
3. **Use official tools** - Libraries, SDKs, APIs as designed
4. **Fix root causes** - Don't patch symptoms
5. **Test & decide** - Pick winner, delete losers
6. **Document present** - Not past, not alternatives
7. **Clean structure** - No clutter, no "just in case" files
8. **Ship what works** - Production = tested, stable, simple
9. **Commit après chaque itération** - Remind user to commit after each working iteration
10. **On parle français** - Conversations et docs en français maintenant

---

## 💭 When In Doubt

**Ask yourself:**
- Am I building something because a library is missing? → Install the library
- Am I keeping code "just in case"? → Delete it
- Am I patching symptoms? → Fix root cause
- Is this the "proper" way? → Check official docs

**Remember:**
- Git history preserves everything
- Deleted code can be recovered
- Clean code is better than "complete" code
- Working simply > complex workarounds

---

**Last Updated:** 2025-10-10
**Next Review:** When significant architecture changes occur

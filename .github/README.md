# .github Directory

This directory contains GitHub-specific configuration files and templates for the portfolio project.

## 📁 Structure

```
.github/
├── workflows/           # GitHub Actions CI/CD workflows
│   └── ci.yml          # Continuous Integration workflow
├── ISSUE_TEMPLATE/     # Issue templates
│   ├── bug_report.md   # Bug report template
│   └── feature_request.md  # Feature request template
├── pull_request_template.md  # PR template
└── README.md           # This file
```

## 🔄 Workflows

### CI Workflow (`workflows/ci.yml`)

Runs on every push and pull request to main branches:
- **Lint & Type Check**: Runs ESLint and TypeScript type checking
- **Build**: Builds the Next.js application to ensure no build errors

## 📝 Templates

### Pull Request Template

Comprehensive PR template that includes:
- Description and type of change
- Related issues
- Screenshots (before/after)
- Comprehensive checklist
- Responsive design verification
- Performance impact assessment
- AI contribution acknowledgment

### Issue Templates

#### Bug Report
- Clear bug description
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Responsive/design system context

#### Feature Request
- Feature description and problem statement
- Proposed solution
- Design considerations for Neo-Brutalist aesthetic
- Responsive behavior specifications
- Priority level

## 🪝 Git Hooks (Husky)

Pre-commit hooks are configured in `../.husky/pre-commit` to:
- Run `lint-staged` on staged files
- Auto-fix ESLint issues
- Format code with Prettier

This ensures code quality and consistency before commits.

## 🎨 Code Quality

All templates and workflows are designed to maintain:
- **Neo-Brutalist design system**: 3px borders, 8px shadows
- **Responsive design**: Mobile-first approach
- **TypeScript type safety**
- **Accessibility standards**
- **Performance best practices**

## 🚀 Usage

These templates are automatically used when:
- Creating a new pull request
- Creating a new issue
- Pushing code (triggers CI workflow)
- Committing code (triggers pre-commit hooks)

---

**Maintained with ❤️ by Esteban Estrada**

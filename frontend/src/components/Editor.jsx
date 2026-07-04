import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Highlight } from '@tiptap/extension-highlight';
import { CharacterCount } from '@tiptap/extension-character-count';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { useEffect } from 'react';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Minus,
  Code2,
  Highlighter,
  CheckSquare,
  Grid,
  PlusSquare,
  MinusSquare,
  Trash2
} from 'lucide-react';

const lowlight = createLowlight(common);

/**
 * TipTap Editor styled with monochrome "Liquid Glass" apple parameters.
 */
export default function Editor({ 
  content, 
  onChange, 
  onSaveShortcut, 
  onStatsChange,
  placeholder = 'Write something beautiful...' 
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Highlight.configure({
        multicolor: false,
      }),
      CharacterCount,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      
      if (onStatsChange) {
        onStatsChange({
          characters: editor.storage.characterCount.characters(),
          words: editor.storage.characterCount.words(),
        });
      }
    },
    onCreate: ({ editor }) => {
      if (onStatsChange) {
        onStatsChange({
          characters: editor.storage.characterCount.characters(),
          words: editor.storage.characterCount.words(),
        });
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none dark:prose-invert focus:outline-none custom-scrollbar p-6 min-h-[400px]',
      },
      handleKeyDown: (view, event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
          event.preventDefault();
          if (onSaveShortcut) {
            onSaveShortcut();
          }
          return true;
        }
        return false;
      }
    },
  });

  // Sync content dynamically if loaded from DB
  useEffect(() => {
    if (editor && content !== undefined && content !== editor.getHTML()) {
      editor.commands.setContent(content);
      
      if (onStatsChange) {
        onStatsChange({
          characters: editor.storage.characterCount.characters(),
          words: editor.storage.characterCount.words(),
        });
      }
    }
  }, [content, editor, onStatsChange]);

  if (!editor) {
    return null;
  }

  // Minimal Toolbar button wrapper
  const ToolbarButton = ({ onClick, isActive, children, title, className = '' }) => (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-hover active:bg-active transition-all shrink-0 cursor-pointer ${
        isActive ? 'bg-active text-text-primary font-semibold' : ''
      } ${className}`}
      title={title}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col border border-border rounded-2xl overflow-hidden bg-bg-primary/50 shadow-2xs focus-within:border-text-primary focus-within:shadow-xs transition-all duration-250">
      
      {/* Floating Toolbar with scroll-overflow on mobile */}
      <div className="flex items-center justify-between border-b border-border bg-bg-primary/80 select-none overflow-hidden shrink-0">
        
        {/* Scrollable button tray */}
        <div className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar py-2 px-3 scroll-smooth">
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            isActive={editor.isActive('highlight')}
            title="Highlight Text"
          >
            <Highlighter className="h-4 w-4" />
          </ToolbarButton>

          <div className="w-[1px] h-5 bg-border mx-1 shrink-0 self-center" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </ToolbarButton>

          <div className="w-[1px] h-5 bg-border mx-1 shrink-0 self-center" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            isActive={editor.isActive('taskList')}
            title="Task List"
          >
            <CheckSquare className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Blockquote"
          >
            <Quote className="h-4 w-4" />
          </ToolbarButton>

          <div className="w-[1px] h-5 bg-border mx-1 shrink-0 self-center" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            title="Inline Code"
          >
            <Code className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive('codeBlock')}
            title="Code Block"
          >
            <Code2 className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Line"
          >
            <Minus className="h-4 w-4" />
          </ToolbarButton>

          <div className="w-[1px] h-5 bg-border mx-1 shrink-0 self-center" />

          {/* Table Elements */}
          <ToolbarButton
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            isActive={editor.isActive('table')}
            title="Insert Table (3x3)"
          >
            <Grid className="h-4 w-4" />
          </ToolbarButton>

          {editor.isActive('table') && (
            <>
              <ToolbarButton
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                title="Add Column After"
              >
                <PlusSquare className="h-4 w-4 text-text-primary" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().addRowAfter().run()}
                title="Add Row After"
              >
                <PlusSquare className="h-4 w-4 text-text-primary rotate-90" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().deleteColumn().run()}
                title="Delete Column"
              >
                <MinusSquare className="h-4 w-4 text-danger" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().deleteRow().run()}
                title="Delete Row"
              >
                <MinusSquare className="h-4 w-4 text-danger rotate-90" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().deleteTable().run()}
                title="Delete Table"
              >
                <Trash2 className="h-4 w-4 text-danger" />
              </ToolbarButton>
            </>
          )}

        </div>

        {/* History undo/redo */}
        <div className="flex items-center gap-1 border-l border-border py-1.5 px-3 bg-bg-primary">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </ToolbarButton>
        </div>

      </div>

      {/* Editor Content editable workspace */}
      <div className="flex-1 bg-transparent min-h-[400px]">
        <EditorContent editor={editor} />
      </div>

    </div>
  );
}

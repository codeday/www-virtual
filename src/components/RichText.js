import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Text, { Link } from '@codeday/topo/Atom/Text';
import List, { Item } from '@codeday/topo/Atom/List';

const document = {
  nodeType: 'document',
  content: [
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value: 'Hello',
          marks: [{ type: 'bold' }],
        },
        {
          nodeType: 'text',
          value: ' world!',
          marks: [{ type: 'italic' }],
        },
      ],
    },
  ],
};

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Text as="span" d="inline" fontWeight="bold">{text}</Text>,
    [MARKS.ITALIC]: (text) => <Text as="span" d="inline" fontStyle="italic">{text}</Text>,
    [MARKS.UNDERLINE]: (text) => <Text as="span" d="inline" textDecoration="underline">{text}</Text>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.UL_LIST]: (node, children) => <List styleType="disc">{children}</List>,
    [BLOCKS.OL_LIST]: (node, children) => <List styleType="decimal">{children}</List>,
    [BLOCKS.LIST_ITEM]: (node, children) => <Item>{children}</Item>,
    [INLINES.HYPERLINK]: ({ data }, children) => <Link href={data.uri} target="_blank" rel="noopener">{children}</Link>,
  },
  renderText: text => {
    return text.split('\n').reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};

export default function RichText ({ document }) {
  return documentToReactComponents(document, options);
}

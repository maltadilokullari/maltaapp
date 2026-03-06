/**
 * Content Model
 * Block-based content storage for Pages and Posts
 */

/**
 * Allowed block types
 */
export const ALLOWED_BLOCKS = {
  PARAGRAPH: 'paragraph',
  HEADING: 'heading',
  IMAGE: 'image',
  LIST: 'list',
  QUOTE: 'quote',
};

/**
 * Block structure
 */
export const createBlock = (type, data) => {
  const baseBlock = {
    id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    createdAt: new Date(),
  };

  switch (type) {
    case ALLOWED_BLOCKS.PARAGRAPH:
      return {
        ...baseBlock,
        data: {
          text: data.text || '',
        },
      };

    case ALLOWED_BLOCKS.HEADING:
      return {
        ...baseBlock,
        data: {
          level: data.level || 2, // H2 or H3 only
          text: data.text || '',
        },
      };

    case ALLOWED_BLOCKS.IMAGE:
      return {
        ...baseBlock,
        data: {
          url: data.url || '',
          alt: data.alt || '',
          caption: data.caption || '',
          width: data.width || null,
          height: data.height || null,
        },
      };

    case ALLOWED_BLOCKS.LIST:
      return {
        ...baseBlock,
        data: {
          style: data.style || 'unordered', // unordered or ordered
          items: data.items || [],
        },
      };

    case ALLOWED_BLOCKS.QUOTE:
      return {
        ...baseBlock,
        data: {
          text: data.text || '',
          author: data.author || '',
        },
      };

    default:
      throw new Error(`Invalid block type: ${type}`);
  }
};

/**
 * Content validation
 */
export const validateContent = (content) => {
  const errors = [];

  // Content type validation
  if (!content.type || !['page', 'post'].includes(content.type)) {
    errors.push('Content type must be "page" or "post"');
  }

  // Title validation (H1)
  if (!content.title || content.title.trim().length === 0) {
    errors.push('Title (H1) is required');
  }

  if (content.title && content.title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }

  // Slug validation
  if (!content.slug || content.slug.trim().length === 0) {
    errors.push('Slug is required');
  }

  // Slug format validation
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (content.slug && !slugRegex.test(content.slug)) {
    errors.push('Slug must contain only lowercase letters, numbers, and hyphens');
  }

  // Blocks validation
  if (!content.blocks || !Array.isArray(content.blocks) || content.blocks.length === 0) {
    errors.push('At least one content block is required');
  }

  // First block must be paragraph
  if (content.blocks && content.blocks.length > 0) {
    const firstBlock = content.blocks[0];
    if (firstBlock.type !== ALLOWED_BLOCKS.PARAGRAPH) {
      errors.push('First block must be a paragraph');
    }

    if (firstBlock.data && firstBlock.data.text && firstBlock.data.text.trim().length < 50) {
      errors.push('First paragraph must be at least 50 characters');
    }
  }

  // At least one image required
  const hasImage = content.blocks && content.blocks.some(
    (block) => block.type === ALLOWED_BLOCKS.IMAGE
  );
  if (!hasImage) {
    errors.push('At least one image is required');
  }

  // Image alt text validation
  if (content.blocks) {
    content.blocks.forEach((block, index) => {
      if (block.type === ALLOWED_BLOCKS.IMAGE) {
        if (!block.data || !block.data.alt || block.data.alt.trim().length === 0) {
          errors.push(`Image at block ${index + 1} must have alt text`);
        }
      }

      // Block type validation
      if (!Object.values(ALLOWED_BLOCKS).includes(block.type)) {
        errors.push(`Invalid block type at block ${index + 1}: ${block.type}`);
      }

      // Heading level validation (H2-H3 only)
      if (block.type === ALLOWED_BLOCKS.HEADING) {
        if (block.data && block.data.level && ![2, 3].includes(block.data.level)) {
          errors.push(`Heading at block ${index + 1} must be H2 or H3`);
        }
      }
    });
  }

  // Word count validation (minimum 300 words for posts)
  if (content.type === 'post') {
    const totalText = content.blocks
      .filter((block) => block.type === ALLOWED_BLOCKS.PARAGRAPH || block.type === ALLOWED_BLOCKS.HEADING)
      .map((block) => block.data?.text || '')
      .join(' ');
    
    const wordCount = totalText.trim().split(/\s+/).filter((w) => w.length > 0).length;
    if (wordCount < 300) {
      errors.push('Post content must be at least 300 words');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Sanitize content (remove inline styles, scripts, etc.)
 */
export const sanitizeContent = (content) => {
  // Deep clone to avoid mutation
  const sanitized = JSON.parse(JSON.stringify(content));

  // Sanitize block data
  if (sanitized.blocks && Array.isArray(sanitized.blocks)) {
    sanitized.blocks = sanitized.blocks.map((block) => {
      const sanitizedBlock = { ...block };

      // Remove any style attributes
      if (sanitizedBlock.data) {
        Object.keys(sanitizedBlock.data).forEach((key) => {
          if (typeof sanitizedBlock.data[key] === 'string') {
            // Remove inline styles
            sanitizedBlock.data[key] = sanitizedBlock.data[key]
              .replace(/style\s*=\s*["'][^"']*["']/gi, '')
              .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
              .replace(/<script[^>]*>.*?<\/script>/gi, '')
              .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '');
          }
        });
      }

      return sanitizedBlock;
    });
  }

  return sanitized;
};

/**
 * Calculate content statistics
 */
export const calculateContentStats = (content) => {
  if (!content.blocks || !Array.isArray(content.blocks)) {
    return {
      wordCount: 0,
      imageCount: 0,
      headingCount: 0,
      paragraphCount: 0,
    };
  }

  const stats = {
    wordCount: 0,
    imageCount: 0,
    headingCount: 0,
    paragraphCount: 0,
  };

  content.blocks.forEach((block) => {
    switch (block.type) {
      case ALLOWED_BLOCKS.PARAGRAPH:
        stats.paragraphCount++;
        if (block.data && block.data.text) {
          const words = block.data.text.trim().split(/\s+/).filter((w) => w.length > 0);
          stats.wordCount += words.length;
        }
        break;

      case ALLOWED_BLOCKS.HEADING:
        stats.headingCount++;
        if (block.data && block.data.text) {
          const words = block.data.text.trim().split(/\s+/).filter((w) => w.length > 0);
          stats.wordCount += words.length;
        }
        break;

      case ALLOWED_BLOCKS.IMAGE:
        stats.imageCount++;
        break;

      default:
        break;
    }
  });

  return stats;
};

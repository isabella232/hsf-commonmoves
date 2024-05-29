import {
  getMetadata,
} from '../../scripts/aem.js';
import {
  button,
  div,
  h2,
  img,
  p,
  strong,
} from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  const agentPicture = document.createElement('picture');
  agentPicture.appendChild(img({
    loading: 'lazy',
    alt: 'Agent Image',
    src: '',
    width: '48',
    height: '64',
    style: 'width: 48px; height: 64px;',
  }));

  const agentInfo = div({ class: 'agentinfo' },
    h2(strong('')), // Placeholder, will be updated with metadata
    p(''), // Placeholder, will be updated with metadata
    p(''), // Placeholder, will be updated with metadata
  );

  const contactButton = button({ class: 'contactagent' }, 'CONTACT AGENT');

  // Append elements directly to the block
  block.append(
    div({ class: 'floating-agent-col' }, agentPicture),
    agentInfo,
    contactButton,
  );

  // Fetch metadata
  const agentName = getMetadata('name');
  const agentDesc = getMetadata('desc');
  const pic = getMetadata('pic');
  const lic = getMetadata('lic');

  // Populate the elements with metadata values
  const agentImageElement = agentPicture.querySelector('img');
  const agentInfoElements = agentInfo.children;

  agentImageElement.src = pic;
  agentInfoElements[0].innerHTML = `<strong>${agentName}</strong>`;
  agentInfoElements[1].textContent = agentDesc;
  agentInfoElements[2].textContent = lic;
}

const displayedElement = document.querySelector('.floatingagent');

const heroElement = document.querySelector('.hero-wrapper');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      displayedElement.style.display = 'none';
    } else {
      displayedElement.style.display = 'flex';
    }
  });
}, {
  threshold: [0],
});

observer.observe(heroElement);

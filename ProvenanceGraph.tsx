import ReactFlow, {
  Background,
  Controls,
  type Node,
  type Edge,
  Position,
  Handle,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FileText, Edit3, Scissors, Share2, Smartphone, AlertCircle, X } from 'lucide-react';
import type { ProvenanceGraph as GraphData, TransformationType, ContentVersion } from '@/types';

const typeConfig: Record<TransformationType, { icon: typeof FileText; color: string; bg: string; label: string }> = {
  original: { icon: FileText, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', label: 'ORIGINAL' },
  edited: { icon: Edit3, color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.1)', label: 'EDITED' },
  cropped: { icon: Scissors, color: '#6366f1', bg: 'rgba(99, 102, 241, 0.1)', label: 'CROPPED' },
  screenshot: { icon: Smartphone, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)', label: 'SCREENSHOT' },
  reposted: { icon: Share2, color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.1)', label: 'REPOSTED' },
  translated: { icon: Edit3, color: '#6366f1', bg: 'rgba(99, 102, 241, 0.1)', label: 'TRANSLATED' },
  current: { icon: AlertCircle, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)', label: 'CURRENT' },
};

function VersionNode({ data }: { data: { label: string; type: TransformationType; timestamp: string; isCurrent?: boolean; isSelected?: boolean } }) {
  const config = typeConfig[data.type] || typeConfig.original;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="px-4 py-3 rounded-xl glass min-w-[160px] relative"
      style={{
        borderColor: data.isCurrent ? config.color : data.isSelected ? '#06b6d4' : 'rgba(255,255,255,0.06)',
        borderWidth: data.isCurrent || data.isSelected ? 2 : 1,
        boxShadow: data.isSelected ? `0 0 20px ${config.color}40` : 'none',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: config.color, opacity: 0 }} />

      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: config.bg }}
        >
          <Icon size={16} style={{ color: config.color }} />
        </div>
        <div>
          <div className="text-xs font-semibold text-white">{data.label}</div>
          <div className="text-[10px] text-gray-500 font-mono">{data.timestamp}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span
          className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded"
          style={{ color: config.color, backgroundColor: config.bg }}
        >
          {config.label}
        </span>
        {data.isCurrent && (
          <span className="text-[9px] font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-500/10">
            CURRENT
          </span>
        )}
      </div>

      <Handle type="source" position={Position.Right} style={{ background: config.color, opacity: 0 }} />
    </motion.div>
  );
}

const nodeTypes = { versionNode: VersionNode };

interface ProvenanceGraphProps {
  graph: GraphData;
  versions?: ContentVersion[];
  onNodeClick?: (nodeId: string) => void;
}

export function ProvenanceGraph({ graph, versions, onNodeClick }: ProvenanceGraphProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodes: Node[] = graph.nodes.map((node, i) => ({
    id: node.id,
    type: 'versionNode',
    position: { x: i * 280, y: 150 },
    data: {
      label: node.label,
      type: node.type,
      timestamp: node.timestamp,
      isCurrent: node.isCurrent,
      isSelected: selectedNode === node.id,
    },
  }));

  const edges: Edge[] = graph.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#3b82f6', strokeOpacity: 0.5, strokeWidth: 2 },
    labelStyle: { fill: '#8b8d97', fontSize: 11, fontWeight: 500 },
    labelBgStyle: { fill: '#11131a', fillOpacity: 0.8 },
    labelBgPadding: [6, 3] as [number, number],
    labelBgBorderRadius: 4,
    markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6', width: 16, height: 16 },
  }));

  const handleNodeClick = (_: unknown, node: Node) => {
    setSelectedNode(node.id);
    onNodeClick?.(node.id);
  };

  const selectedVersion = versions?.find((v) => v.id === selectedNode);
  const selectedGraph = graph.nodes.find((n) => n.id === selectedNode);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
      {/* Graph */}
      <div className="h-[500px] w-full rounded-2xl glass overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={handleNodeClick}
          onPaneClick={() => setSelectedNode(null)}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          panOnScroll
          zoomOnScroll
          proOptions={{ hideAttribution: true }}
        >
          <Background color="rgba(255,255,255,0.03)" gap={20} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      {/* Detail panel */}
      <div className="h-[500px] overflow-y-auto">
        <AnimatePresence mode="wait">
          {selectedVersion || selectedGraph ? (
            <motion.div
              key={selectedNode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl p-5 h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Node Details</h3>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close panel"
                >
                  <X size={14} className="text-gray-400" />
                </button>
              </div>

              {(() => {
                const node = selectedVersion;
                const gNode = selectedGraph!;
                const config = typeConfig[gNode.type] || typeConfig.original;
                const Icon = config.icon;

                return (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: config.bg }}
                      >
                        <Icon size={20} style={{ color: config.color }} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{gNode.label}</div>
                        <div className="text-xs text-gray-500 font-mono">{gNode.timestamp}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded"
                        style={{ color: config.color, backgroundColor: config.bg }}
                      >
                        {config.label}
                      </span>
                      {gNode.isCurrent && (
                        <span className="text-[10px] font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10">
                          CURRENT
                        </span>
                      )}
                    </div>

                    {node?.source && (
                      <div>
                        <div className="text-[10px] text-gray-600 font-semibold tracking-wide mb-1">SOURCE</div>
                        <div className="text-xs text-gray-400">
                          {node.source}
                          {node.sourceType === 'demo' && (
                            <span className="ml-2 text-[10px] text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-500/10">DEMO</span>
                          )}
                        </div>
                      </div>
                    )}

                    {node?.similarity && (
                      <div>
                        <div className="text-[10px] text-gray-600 font-semibold tracking-wide mb-2">SIMILARITY SCORES</div>
                        <div className="space-y-1.5">
                          {[
                            { label: 'Visual', value: node.similarity.visual },
                            { label: 'Text', value: node.similarity.text },
                            { label: 'Semantic', value: node.similarity.semantic },
                            { label: 'Entity', value: node.similarity.entity },
                            { label: 'Composite', value: node.similarity.composite },
                          ].map((s) => (
                            <div key={s.label} className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-20">{s.label}</span>
                              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${s.value}%`,
                                    background: s.label === 'Composite'
                                      ? 'linear-gradient(90deg, #3b82f6, #06b6d4)'
                                      : '#3b82f6',
                                  }}
                                />
                              </div>
                              <span className="text-xs text-gray-400 font-mono w-8 text-right">{s.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {node?.changes && node.changes.length > 0 && (
                      <div>
                        <div className="text-[10px] text-gray-600 font-semibold tracking-wide mb-2">CHANGES FROM PREVIOUS</div>
                        <div className="space-y-1.5">
                          {node.changes.map((c) => (
                            <div key={c.id} className="text-xs">
                              <span
                                className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded mr-2"
                                style={{
                                  color: c.category === 'ADDED' ? '#10b981' : c.category === 'REMOVED' ? '#ef4444' : '#f59e0b',
                                  backgroundColor: c.category === 'ADDED' ? 'rgba(16,185,129,0.1)' : c.category === 'REMOVED' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                                }}
                              >
                                {c.category}
                              </span>
                              <span className="text-gray-400">{c.field}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {node?.metadata && Object.keys(node.metadata).length > 0 && (
                      <div>
                        <div className="text-[10px] text-gray-600 font-semibold tracking-wide mb-2">METADATA</div>
                        <div className="space-y-1">
                          {Object.entries(node.metadata).filter(([, v]) => v).map(([key, value]) => (
                            <div key={key} className="flex items-start gap-2 text-xs">
                              <span className="text-gray-600 capitalize min-w-[80px]">{key}:</span>
                              <span className="text-gray-400 font-mono break-all">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-2xl p-5 h-full flex flex-col items-center justify-center text-center"
            >
              <div className="w-12 h-12 rounded-xl glass-light flex items-center justify-center mb-3">
                <AlertCircle size={24} className="text-gray-500" />
              </div>
              <p className="text-sm text-gray-400 mb-1">Select a node</p>
              <p className="text-xs text-gray-600">Click any node in the graph to inspect its details, similarity scores, and changes.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
